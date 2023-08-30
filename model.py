from sklearn.datasets import make_blobs
from sklearn.metrics import accuracy_score
from sklearn.ensemble import IsolationForest

# sample data set contains features that were used in determing alert in the transaction
X, y = make_blobs(n_samples=[4,96], centers=[[1,2,3,1000],[2,1,6,1100]], n_features=4, random_state=0, shuffle="True")

clf = IsolationForest(n_estimators=300,max_samples=10, random_state=0,max_features=4,contamination=0.1)
clf = clf.fit(X)


y_pred = clf.predict(X)
y_pred[y_pred == -1] = 0

fraud_accuracy_prediction= round(accuracy_score(y,y_pred),2)
# print("The accuracy to detect fraud is {accuracy}  %" .format (accuracy=fraud_accuracy_prediction*100))

amt = 0
for i in range(len(X)) :
    amt += X[i][3]
amt = amt/100
print(amt)

qty = 0
for i in range(len(X)) :
    qty += X[i][2]
qty = qty/100
print(qty)

def checkAVG(trans):
    c = 1
    if trans[0] > qty + 5 :
        c = 0
    # here we have taken average amount + 3000 as threshold value
    if trans[1] > amt + 3000 :
        c = 0
    return c

def frauddetection(trans):
    transaction_type=(clf.predict([trans]))

    if  transaction_type[0] < 0:
        n = 0
    else:
        n = 1
    return n

