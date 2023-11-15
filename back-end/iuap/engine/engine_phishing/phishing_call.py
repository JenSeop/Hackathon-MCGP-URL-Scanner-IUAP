import requests

def get_data_from_api(page=1, per_page=10, service_key=None):
    url = 'https://api.odcloud.kr/api/15109780/v1/uddi:707478dd-938f-4155-badb-fae6202ee7ed'
    params = {
        'page': page,
        'perPage': per_page,
        'serviceKey': service_key
    }

    headers = {
        'accept': '*/*',
        'Authorization': '*/*'
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()  # Check for HTTP errors

        return response.json()  # JSON 응답을 반환

    except requests.exceptions.RequestException as err:
        print(f"Request Exception: {err}")
    except requests.exceptions.JSONDecodeError as err:
        print(f"JSON Decode Error: {err}")
        print(response.text)  # 디버깅을 위해 응답 내용 출력
    except Exception as err:
        print(f"Error: {err}")

    return None

# 예제 사용
page_data = get_data_from_api(page=1, per_page=10, service_key='LkG18EeP9ag06uzNTHkAv3561cC5CFgcwlhfQ3HpdO8ReYSKiRNsf3KQyCMNVM0m9trhUZ6X2eOcUbzUcVAVOw==')
print(page_data)
