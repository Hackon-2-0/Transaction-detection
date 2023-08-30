from flask import Flask, render_template, request,redirect
import model

from urllib.parse import unquote as urllib_unquote
from slugify import slugify
import sys
import json

# from jinja2 import  Environment ,FileSystemLoader
#
# with open("products.json","r") as d :
#      albums = json.load(d)

# fileLoader = FileSystemLoader("templates")
# env = Environment(loader = fileLoader)
#
# rendered = env.get_template("index.html").render(albums = albums)

app = Flask(__name__)


@app.route("/")
def Home():
    return render_template("store.html")

@app.template_filter('unquote')
def unquote(url):
    safe = app.jinja_env.filters['safe']
    return safe(urllib_unquote(url))

@app.route("/page/<string:user>")
def page(user):
    print(user)
    url = slugify(user)
    return render_template(url)

@app.route("/prediction", methods=["POST"])
def prediction():
    print("Inside predict")
    if request.method == "POST":
        print("Inside POST")
        qty = request.form['qty']

        amount = request.form['amount']


        print(qty)
        print(amount)

        n = [1, 2]

        n.append(int(qty))
        n.append((int(amount)))
        print(n)

    ans = model.frauddetection(n)

    if ans == 0:
        print("ans == 0")
        result = "Transaction on Hold Check Your Email"
    else:
        print("ans != 0")
        secondChck = model.checkAVG(n)
        if secondChck == 0:
            result = "Transaction on Hold Check Your Email"
        else:
            result = "Transaction successful Continue Shopping"
            print(result)
    return render_template("form.html", result=result)


@app.route("/settingValue", methods=["POST"])
def settingValue():
    print("Inside predict")
    if request.method == "POST":
        print("Inside POST")
        data = request.get_json()
        print(data)
        data = json.loads(data)
        print(data)
        qty = data['b']
        amount = data['a']
        print(qty)
        print(amount)
        result = answer(qty, amount)
        print(result)
    # if result == "Fraud Transaction":
    #     return redirect('success')
    # else :
    #     return redirect('failed')
    # return render_template('form.html',result=result)
    return result

@app.route("/success")
def success():
    return render_template("success.html")

@app.route("/failed")
def failed():
    return render_template("failed.html")

def answer(qty,amount):
    n = [2,1]
    n.append(int(qty))
    n.append(int(amount))

    arr = [int(qty),int(amount)]
    r = model.frauddetection(n)

    if(r == 0):
        result = "Transaction on Hold Check Your Email"
    else:
        z = model.checkAVG(arr)
        if z == 0:
            result = "Transaction on Hold Check Your Email"
        else :
            result = "Transaction checked continue payment"
    return result

if __name__ == "__main__":
    app.run()
