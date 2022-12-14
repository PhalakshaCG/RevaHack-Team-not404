import os

from flask import Flask
from . import auth, model


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='6c4d7ffb720fbd5f684ef7015b2c0c0ec82fc3b999d88fe80cfbd64af6506820',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    app.register_blueprint(auth.bp)
    app.register_blueprint(model.app)

    return app
