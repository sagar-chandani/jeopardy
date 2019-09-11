
import pandas as pd
import numpy as np
import re
from flask import Flask, request, jsonify, render_template
from sklearn.externals import joblib
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem.snowball import SnowballStemmer
from nltk.corpus import stopwords
from flask_cors import CORS , cross_origin
stop_words = stopwords.words("english")

root_stemmer = SnowballStemmer("english")

analyzer = CountVectorizer().build_analyzer()




def rooting(text):
    return (root_stemmer.stem(w) for w in analyzer(text))

# analyzer = CountVectorizer(analyzer = rooting)


app = Flask(__name__)
cors = CORS(app,origins="http://localhost:8080", allow_headers=[
    "Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
    supports_credentials=True, intercept_exceptions=False)

jeodata_count_file_name = 'jeodata_count.pkl'
jeodata_tfidf_transformer_file_name = 'jeodata_transformer.pkl'
jeodata_tfidf_train_file_name = 'jeodata_getTfidf.pkl'
jeodata_file_name = 'jeodata.pkl'
count_vector = joblib.load(jeodata_count_file_name)

# print(count_vector.shape)

tfidf_transformer = joblib.load(jeodata_tfidf_transformer_file_name)
jeodata_get_results = pd.read_pickle(jeodata_file_name)
tfidf_trained = joblib.load(jeodata_tfidf_train_file_name)


def text_converter(text):
    text = re.sub('[^a-z/s]', ' ', text.lower())
    text = [w for w in text.split() if w not in set(stop_words)]
    return ' '.join(text)


@app.route('/search', methods=['POST', 'GET'])
@cross_origin()
def search():
    try:
        query = request.args.get("query")
        print (query)
        query = text_converter(query)
        query_matrix = count_vector.transform([query])
        query_tfidf = tfidf_transformer.transform(query_matrix)
        similarity_score = cosine_similarity(query_tfidf, tfidf_trained)
        sorted_index = np.argsort(similarity_score).tolist()
        results = jeodata_get_results[['Question', 'Answer']].iloc[(sorted_index[0])[-20:]]
    except Exception as e:

        print ('Error:', e)

    # else:

        print ('elseeee')
    return results.to_json(orient='records')


# For Classification 
jeodata = pd.read_csv('JEOPARDY_CSV.csv')
category= ['BEFORE & AFTER', 'SCIENCE', 'LITERATURE', 'AMERICAN HISTORY',
       'POTPOURRI', 'WORLD HISTORY', 'WORD ORIGINS', 'COLLEGES & UNIVERSITIES',
       'HISTORY', 'SPORTS', 'U.S. CITIES', 'WORLD GEOGRAPHY']

def text_converter_classification(text):
    text = re.sub('[^a-z/s]', ' ', text.lower())
    text = [w for w in text.split() if w not in set(stop_words)]
    return text
def hasCategory(x):
    if x in category:
        return 1
    else:
        return 0
jeodata['flag'] = jeodata[' Category'].apply(hasCategory)
new_jeodata = jeodata[jeodata['flag']==1]

new_jeodata[' Question'] = new_jeodata[' Question'].apply(text_converter_classification)

def category_to_column(x):
    y=[0,0,0,0,0,0,0,0,0,0,0,0]
    y[category.index(x)] = 1
    return y

new_jeodata[' CategoryColumn'] = new_jeodata[' Category'].apply(category_to_column)

y_train = new_jeodata[' CategoryColumn'].tolist()
x_train = new_jeodata[' Question'].tolist()

from naive_bayes import naive_bayes
x_train = np.array(x_train)
y_train = np.array(y_train)
classifier = naive_bayes()
classifier.initialize(x_train,y_train, category)


#for classification end

@app.route('/classification', methods=['POST', 'GET'])
@cross_origin()
def classification():
    try:
        query = request.args.get("query")
        print (query)
        query = text_converter_classification(query)
        classification_result=classifier.predict(query)
        return jsonify(classification_result)

    except Exception as e:

        print ('Error:', e)

    # else:

        print ('elseeee')
    return classification_result


@app.route('/')
@cross_origin()
def index():
    return render_template('search.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


			