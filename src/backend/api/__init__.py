from flask import Flask
from flask_cors import CORS
from . import config
import os

def create_app():
    """Create and configure an instance of the Flask application."""
    api = Flask(__name__, instance_relative_config=False)
    
    if "ENV" in os.environ:
        if os.environ["ENV"] == "production":
            api.config.from_object(config.ProdConfig)
        elif os.environ["ENV"] == "development":
            api.config.from_object(config.DevConfig)
    
    CORS(api)

    with api.app_context():
        # Import parts of our application
        from .questions.routes import quest_bp
        from .summarise.routes import sum_bp

        # Register blueprints
        api.register_blueprint(quest_bp)
        api.register_blueprint(sum_bp)
        return api
