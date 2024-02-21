# app/routes.py

def init_user_routes(app):
    @app.route('/', methods=['GET'])
    def demo():
        return "Hello World!"

    @app.route('/users', methods=['GET'])
    def get_users():
        # Dummy user data
        users = [{"username": "john_doe", "email": "john@example.com"}]
        return users
