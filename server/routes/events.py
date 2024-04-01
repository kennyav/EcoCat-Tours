from flask import (
   Blueprint, jsonify, request
)
from datetime import date, datetime, timedelta
from models import db, EventsModel, EventsScheduleModel
from sqlalchemy import extract 

# this creates the auth blueprint
bp = Blueprint('events', __name__, url_prefix='/events')

def check_for_overlapping_events(start_date, end_date):
    # Retrieve all events on the same day as start_date
    events_on_same_day = EventsScheduleModel.query.filter(
        extract('year', EventsScheduleModel.start_time) == start_date.year,
        extract('month', EventsScheduleModel.start_time) == start_date.month,
        extract('day', EventsScheduleModel.start_time) == start_date.day
    ).all()

    if events_on_same_day:
        # Check for overlapping events
        for event in events_on_same_day:
            print("[DEBUG]", event.start_time.time(), event.end_time.time())
            print("[DEBUG]", start_date.time(), end_date.time())
            # Check if event overlaps with the provided date range
            if (start_date.time() >= event.start_time.time() and start_date.time() <= event.end_time.time()):
                print("1 ====================================================")
                return True
            elif (end_date.time() >= event.start_time.time() and end_date.time() <= event.end_time.time()):
                print("2 ====================================================")
                return True
            elif (start_date.time() <= event.start_time.time() and end_date.time() >= event.end_time.time()):
                print("3 ====================================================")
                return True
           

    return False




@bp.route('/schedule-event', methods=["POST"]) 
def schedule_event():
    data = request.json
    event_id = data.get('eventId')
    start = data.get('startDate')
    end = data.get('endDate')
    end_t = data.get('endTime')
    repeated = data.get('repeated')
    repeated_weekly = data.get('repeatedWeekly')
    adult_number = data.get('adultNumber')
    children_number = data.get('childrenNumber')
    infant_number = data.get('infantNumber')
    run_days = data.get('days')
    capacity = data.get('capacity')
    #2024-04-01T08:00
    start_date = datetime.strptime(start, '%Y-%m-%dT%H:%M')
    if end:
        end_date = datetime.strptime(end, '%Y-%m-%d')
        end_time = datetime.strptime(end_t, '%H:%M')
        combined_datetime = datetime.combine(end_date.date(), end_time.time())
    else:
        # If end doesn't exist, attach today's date to end_time
        end_time = datetime.strptime(end_t, '%H:%M')
        today_date = date.today()
        combined_datetime = datetime.combine(today_date, end_time.time())

    # Check if there are any overlapping events
    overlapping_event = check_for_overlapping_events(start_date, end_time)

    if overlapping_event:
        event = EventsModel.query.get(event_id)
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": "Overlapping event exists"}), 400
    
    # run days format "MTWThFSaSu"
    if repeated:
        index = start_date.weekday()
        current_date = datetime(start_date.year, start_date.month, start_date.day,
                             start_date.hour, start_date.minute, start_date.second)
        
        if repeated_weekly:
            while not current_date >= end_date:
                # we loop through the days of the week and if they have a 1 then we send them to the db
                # we start at start_date and increment until we hit the end date
                for day in run_days[index:]:
                    if day == "1":
                        new_schedule = EventsScheduleModel(
                            event_id=event_id,
                            start_time=current_date,
                            end_time=combined_datetime,
                            adult_passengers=adult_number,
                            children_passengers=children_number,
                            infant_passengers=infant_number,
                            days=run_days,
                            capacity=capacity
                            )
                        db.session.add(new_schedule)
                        db.session.commit()
                    current_date = current_date + timedelta(days=1)
                    if current_date >= end_date:
                        break
                # set index to 0 to reset week
                index = 0
        else:
            # else we are going bi weekly so we increment the current_date by a week
            # when we are done with the current week 
            while not current_date >= end_date:
                # we loop through the days of the week and if they have a 1 then we send them to the db
                # we start at start_date and increment until we hit the end date
                for day in run_days[index:]:
                    if day == "1":
                        new_schedule = EventsScheduleModel(
                            event_id=event_id,
                            start_time=current_date,
                            end_time=combined_datetime,
                            adult_passengers=adult_number,
                            children_passengers=children_number,
                            infant_passengers=infant_number,
                            days=run_days,
                            capacity=capacity
                            )
                        db.session.add(new_schedule)
                        db.session.commit()
                    current_date = current_date + timedelta(days=1)
                    if current_date >= end_date:
                        break
                # set index to 0 to reset week
                # once we are out of the for loop we are on Mon because we incerment 
                # after we check Sun
                # so we add 6 to get to monday
                index = 0
                current_date = current_date + timedelta(days=7)
    else:
        new_schedule = EventsScheduleModel(
            event_id=event_id,
            start_time=start_date,
            end_time=combined_datetime,
            adult_passengers=adult_number,
            children_passengers=children_number,
            infant_passengers=infant_number,
            days=run_days,
            capacity=capacity)
        db.session.add(new_schedule)
        db.session.commit()

    return jsonify({"message": "Event scheduled successfully"})

@bp.route('/register-event', methods=["POST"])
def register_event():
   data = request.json
   title = data.get('title')
   description = data.get('description')
   capacity = data.get('capacity')
   above_drinking_age = data.get('aboveDrinkingAge')
   created_by = data.get('createdBy')

   # Create a new event in the database
   new_event = EventsModel(
     title= title,
     description=description,
     capacity=capacity,
     above_drinking_age=above_drinking_age,
     created_by=created_by
    )

   db.session.add(new_event)
   db.session.commit()

   if new_event:
        return jsonify(new_event.serialize()), 200
   else:
       return jsonify({"message": "No passengers found for the specified event and time"}), 404


@bp.route('/@events/', methods=["GET"])
def get_all_events():
    all_events = EventsModel.query.all()
    
    if all_events:
        return jsonify([event.serialize() for event in all_events]), 200
    else:
        return jsonify({"message": "No events found"}), 404
    

@bp.route('/<event_id>/', methods=["GET"])
def get_event_schedule(event_id):
    event_schedule = EventsScheduleModel.query.filter_by(event_id=event_id).first()
    
    if event_schedule:
        return jsonify(event_schedule.serialize()), 200
    else:
        return jsonify({"message": "No events found"}), 404
    
@bp.route('/get-event/<event_id>', methods=["GET"])
def get_event(event_id):
    event_s = EventsScheduleModel.query.get(event_id)
    event = EventsModel.query.filter_by(id=event_s.event_id).first()
    
    if event:
        return jsonify(event.serialize()), 200
    else:
        return jsonify({"message": "No events found"}), 404
    

@bp.route('/dates', methods=["GET"])
def get_scheduled_events():
    # Split the event IDs and convert them to a list
    ids = request.args.get('eventIds')
    year = request.args.get('currentYear')
    month = request.args.get('currentMonth')
    dates = request.args.get('dates')

    #2024-04-01T08:00
    start_date = datetime.strptime("2024-04-01T08:00", '%Y-%d-%mT%H:%M')
    print("[DEBUG] Test", start_date.year, start_date.month, start_date.day)

    ids_list = ids.split(',')
    dates_list = dates.split(',')

    # Initialize an empty list to store the events
    events = []

    # loop through all the days and see if there are events
    # return {day_number, [List of Events]} if true
    # return nothing if false
    for day in dates_list:
        print("[DEBUG]", day,type(day), month, year)
        if day:
            date = datetime(int(year), int(month), int(day))

            day_events = []
            for event_id in ids_list:
                # Iterate through each event ID, because for edit events we need
                # to just return the event we are editing
                # with home page we just have to struggle a little with
                # having to go through the loop to accomodate edits
                event_schedule = EventsScheduleModel.query.filter(
                    EventsScheduleModel.event_id == event_id,
                    extract('year', EventsScheduleModel.start_time) == date.year,
                    extract('month', EventsScheduleModel.start_time) == date.month,
                    extract('day', EventsScheduleModel.start_time) == int(day)
                ).first()
                if event_schedule:
                    day_events.append(event_schedule.serialize())

            if day_events:
                events.append({'day': day, 'list_of_events': day_events})

    if events:
        return jsonify(events), 200
    else:
        return jsonify({"message": "No events found"}), 404


@bp.route("/delete/<event_id>", methods=["DELETE"])
def delete_event(event_id):
    event = EventsModel.query.get(event_id)
    eventSchedule = EventsScheduleModel.query.filter_by(event_id=event_id).all()

    if not event:
        return jsonify({"error": "Event not found"}), 404
    for schedule in eventSchedule:
        db.session.delete(schedule)
        db.session.commit()
    
    db.session.delete(event)
    db.session.commit()

    return jsonify({"message": "Event deleted successfully"})

@bp.route("/delete-single-event/<event_id>", methods=["DELETE"])
def delete_single_event(event_id):
    event = EventsScheduleModel.query.get(event_id)

    if not event:
        return jsonify({"error": "Event not found"}), 404
    
    db.session.delete(event)
    db.session.commit()

    return jsonify({"message": "Single Event deleted successfully"})

@bp.route("/edit-capacity/<event_id>", methods=["PUT"])
def edit_capacity(event_id):
    event = EventsScheduleModel.query.get(event_id)

    if not event:
        return jsonify({"error": "Event not found"}), 404
    
    # Update the salesmen information based on the request data
    if 'capacity' in request.json:
        event.capacity = event.capacity - request.json['capacity']
    

    db.session.commit()

    return jsonify({
        "message": "Capacity updated successfully",
    })

@bp.route("/edit-event/<event_id>", methods=["PUT"])
def edit_event(event_id):
    event = EventsScheduleModel.query.get(event_id)

    if not event:
        return jsonify({"error": "Event not found"}), 404
    
    # Update the salesmen information based on the request data
    if 'start' in request.json:
        start_date = datetime.strptime(request.json['start'], '%Y-%d-%m %H:%M:%S')
        event.start_time = start_date
    if 'end' in request.json:
        end_date = datetime.strptime(request.json['end'], '%Y-%d-%m %H:%M:%S')
        event.end_time = end_date
    if 'adults' in request.json:
        event.adult_passengers = request.json['adults']
    if 'children' in request.json:
        event.children_passengers = request.json['children']
    if 'infants' in request.json:
        event.infant_passengers = request.json['infants']
    
    

    db.session.commit()

    return jsonify({
        "message": "Event updated successfully",
    })