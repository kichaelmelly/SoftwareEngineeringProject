class DevConfig:
    FLASK_ENV = "development"
    DEBUG = True
    TESTING = True
    
class ProdConfig:
    FLASK_ENV = "production"
    DEBUG = False
    TESTING = False