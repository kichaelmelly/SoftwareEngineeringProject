from flask import Blueprint, request, jsonify
from .sum import xsum_summarisation, extractive_summarisation

sum_bp = Blueprint("sum_bp", __name__)


@sum_bp.route("/get_extractive_summary", methods=["POST"])
def get_extractive_summary():
    data = request.get_json()
    text = data.get("text")
    output = extractive_summarisation(text)
    return jsonify({"summary": output})


@sum_bp.route("/get_xsum_summary", methods=["POST"])
def get_xsum_summary():
    data = request.get_json()
    text = data.get("text")
    output = xsum_summarisation(text)
    return jsonify({"summary": output})
