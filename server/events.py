from flask import (
   Blueprint, jsonify, request
)
from datetime import datetime
from models import db, EventsModel

# this creates the auth blueprint
bp = Blueprint('events', __name__, url_prefix='/events')

@bp.route('/register-event', methods=["POST"])
def register_event():
   data = request.json
   event_name = data.get('eventName')
   event_description = data.get('eventDescription')
   event_start_date = datetime.strptime(data.get('eventStartDate'), '%Y-%m-%d')
   event_end_date = datetime.strptime(data.get('eventEndDate'), '%Y-%m-%d')
   event_start_time = datetime.strptime(data.get('eventStartTime'), '%H:%M').time()
   event_end_time = datetime.strptime(data.get('eventEndTime'), '%H:%M').time()
   event_run_days = data.get('runDays')
   event_repeated = data.get('eventRepeated')
   event_repeated_weekly = data.get('eventRepeatedWeekly')
   event_repeated_biweekly = data.get('eventRepeatedBiWeekly')
   event_capacity = data.get('eventCapacity')
   event_age_21_plus = data.get('eventAge21Plus')
   adult_number = data.get('adultNumber')
   children_number = data.get('childrenNumber')
   infant_number = data.get('infantNumber')

   # Create a new event in the database
   new_event = EventsModel(
     event_title=event_name,
     event_description=event_description,
     event_start_date=event_start_date,
     event_end_date=event_end_date,
     event_start_time=event_start_time,
     event_end_time=event_end_time,
     event_run_days=event_run_days,
     event_repeated=event_repeated,
     event_repeated_weekly=event_repeated_weekly,
     event_repeated_biweekly=event_repeated_biweekly,
     event_capacity=event_capacity,
     event_age_21_plus=event_age_21_plus,
     adult_passengers=adult_number,
     children_passengers=children_number,
     infant_passengers=infant_number
    )

   db.session.add(new_event)
   db.session.commit()

   return jsonify({"message": "Event registered successfully"})


@bp.route('/@events', methods=["GET"])
def get_all_events():
    all_events = EventsModel.query.all()
    event_list = []
    
    for event in all_events:
        event_data = {
            'event_title': event.event_title,
            'event_description': event.event_description,
            'event_start_date': event.event_start_date.strftime('%Y-%m-%d'),
            'event_end_date': event.event_end_date.strftime('%Y-%m-%d'),
            'event_start_time': event.event_start_time.strftime('%H:%M'),
            'event_end_time': event.event_end_time.strftime('%H:%M'),
            'event_run_days': event.event_run_days,
            'event_repeated': event.event_repeated,
            'event_repeated_weekly': event.event_repeated_weekly,
            'event_repeated_biweekly': event.event_repeated_biweekly,
            'event_capacity': event.event_capacity,
            'event_age_21_plus': event.event_age_21_plus,
            'adult_passengers': event.adult_passengers,
            'children_passengers': event.children_passengers,
            'infant_passengers': event.infant_passengers
        }
        event_list.append(event_data)
    
    return jsonify(event_list)
