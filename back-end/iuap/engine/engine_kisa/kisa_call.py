import requests

api_key = 'API KEY'

def kisa_call(domain_query, response_format='json'):
    base_url = 'http://apis.data.go.kr/B551505/whois/domain_name'
    
    # 파라미터 설정
    params = {
        'serviceKey': api_key,
        'query': domain_query,
        'answer': response_format,
    }

    try:
        # API 호출
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # HTTP 오류 확인

        # JSON 응답일 경우 파싱하여 반환
        return response.json() if response_format == 'json' else response.text

    except requests.exceptions.RequestException as err:
        print(f"요청 예외: {err}")
    except requests.exceptions.JSONDecodeError as err:
        print(f"JSON 디코딩 오류: {err}")
        print(response.text)  # 디버깅을 위해 응답 내용 출력
    except Exception as err:
        print(f"오류: {err}")

    return None