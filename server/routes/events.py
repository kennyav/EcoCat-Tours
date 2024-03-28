from flask import (
   Blueprint, jsonify, request
)
from datetime import datetime, timedelta
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
            if (start_date.time() > event.start_time.time() and start_date.time() < event.end_time.time()):
                return True
            elif (end_date.time() > event.start_time.time() and end_date.time() < event.end_time.time()):
                return True
            elif (start_date.time() < event.start_time.time() and end_date.time() > event.end_time.time()):
                return True

    return False




@bp.route('/schedule-event', methods=["POST"]) 
def schedule_event():
    print("[DEBUG] DO We Get Here?")
    data = request.json
    event_id = data.get('eventId')
    start = data.get('formattedStartDate')
    end = data.get('formattedEndDate')
    end_t = data.get('formattedEndTime')
    repeated = data.get('repeated')
    repeated_weekly = data.get('repeatedWeekly')
    run_days = data.get('days')
    start_date = datetime.strptime(start, '%Y-%d-%m %H:%M:%S')
    end_date = datetime.strptime(end, '%Y-%d-%m %H:%M:%S')
    end_time = datetime.strptime(end_t, '%Y-%d-%m %H:%M:%S')

    print("[DEBUG] start time", start, type(start))
    print("[DEBUG] end time", end_time, type(end))

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
                            end_time=end_date,
                            days=run_days
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
                            end_time=end_time,
                            days=run_days
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
            end_time=end_time,
            days=run_days)
        db.session.add(new_schedule)
        db.session.commit()

    return jsonify({"message": "Event scheduled successfully"})

@bp.route('/register-event', methods=["POST"])
def register_event():
   print("[DEBUG] Do we get to register event?")
   data = request.json
   title = data.get('title')
   description = data.get('description')
   capacity = data.get('capacity')
   above_drinking_age = data.get('aboveDrinkingAge')
   adult_number = data.get('adultNumber')
   children_number = data.get('childrenNumber')
   infant_number = data.get('infantNumber')
   created_by = data.get('createdBy')
   print("[DEBUG] Do we set variables right?")

   # Create a new event in the database
   new_event = EventsModel(
     title= title,
     description=description,
     capacity=capacity,
     above_drinking_age=above_drinking_age,
     adult_passengers=adult_number,
     children_passengers=children_number,
     infant_passengers=infant_number,
     created_by=created_by
    )

   print("[DEBUG] Do we create a new event model")
   db.session.add(new_event)
   db.session.commit()
   print("[DEBUG] Do we add and commit event?")

   if new_event:
        print("[DEBUG] Do we get return 200?")
        return jsonify(new_event.serialize()), 200
   else:
       print("[DEBUG] Do we return 404?")
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
    
@bp.route('/<event_ids>/<date_str>', methods=["GET"])
def get_scheduled_events(event_ids, date_str):
    # Parse the date string
    truncated_date = date_str.rsplit(" ", 4)[0]
    date = datetime.strptime(truncated_date, "%a %b %d %Y %H:%M:%S")

    # Split the event IDs and convert them to a list
    event_id_list = event_ids.split(',')

    # Initialize an empty list to store the events
    events = []


    
    for event_id in event_id_list:
        # Iterate through each event ID
        
        event_schedule = EventsScheduleModel.query.filter(
            EventsScheduleModel.event_id == event_id,
            extract('year', EventsScheduleModel.start_time) == date.year,
            extract('month', EventsScheduleModel.start_time) == date.month,
            extract('day', EventsScheduleModel.start_time) == date.day
        ).first()

        if event_schedule:
            events.append(event_schedule.serialize())

    if events:
        return jsonify(events), 200
    else:
        return jsonify({"message": "No events found"}), 404


@bp.route("/delete/<event_id>", methods=["DELETE"])
def delete_salesman(event_id):
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