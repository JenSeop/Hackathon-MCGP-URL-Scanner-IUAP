import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
from sklearn import datasets
from sklearn.neighbors import KNeighborsClassifier
import joblib



# 데이터 로드
file_path = './phishing.csv' # 파일 경로를 여기에 넣으세요
phishing_data = pd.read_csv(file_path)

# 'Domain' 열 제거
phishing_data = phishing_data.drop('Domain', axis=1)

# 가상의 'Label'이 0인 데이터 생성
# 이 부분은 실제 데이터에 기반하여 적절하게 수정해야 합니다
normal_data = phishing_data.copy()
normal_data['Label'] = 0

# 데이터 병합
combined_data = pd.concat([phishing_data, normal_data])

# 특징과 라벨 분리
X = combined_data.drop('Label', axis=1)
y = combined_data['Label']

# 훈련 및 테스트 세트 분할 (stratify 사용)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0, stratify=y)

# 모델 생성 및 훈련
model = LogisticRegression()
model.fit(X_train, y_train)

# 모델 평가
predictions = model.predict(X_test)
print(classification_report(y_test, predictions))
print(confusion_matrix(y_test, predictions))

# 모델 훈련
joblib.dump(model, './model.pkl')
