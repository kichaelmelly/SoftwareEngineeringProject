from flask import Blueprint, request, jsonify
from .que import gen_question, gen_bool

quest_bp = Blueprint("quest_bp", __name__)


@quest_bp.route("/get_question", methods=["POST"])
def get_question():
    data = request.get_json()
    text = data.get("text")
    output = gen_question(text)
    return jsonify({"questions": output})


@quest_bp.route("/get_bool_questions", methods=["POST"])
def get_bool_questions():
    data = request.get_json()
    text = data.get("text")
    output = gen_bool(text)
    return jsonify({"questions": output})
