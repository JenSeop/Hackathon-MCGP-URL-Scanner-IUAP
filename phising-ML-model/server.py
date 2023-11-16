from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# model.pkl 파일에서 모델 불러오기
model = joblib.load('model.pkl')  # 모델 파일의 경로를 확인하세요

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        try:
            data = request.get_json()  # JSON 형태의 데이터를 받음
            df = pd.DataFrame(data, index=[0])
            prediction = model.predict(df)  # 모델을 사용하여 예측

            # JSON 형태로 결과 반환
            return jsonify({'prediction': int(prediction[0])})
        except Exception as e:
            return jsonify({'error': str(e)})
    else:
        # GET 요청에 대한 처리
        return jsonify({'message': 'Welcome to the prediction model API!'})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)  # 모든 네트워크 인터페이스에서 접근 허용

if __name__ == '__main__':
    app.run(debug=True)
    

