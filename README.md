# 1. 뉴토끼 마나토끼 북토끼 다운로드 스크립트
- 프로그램 설치 불필요
- 정보수집 없음
## 사용법
1. [다운로드 스크립트](https://raw.githubusercontent.com/crossSiteKikyo/tokiDownloader/main/tokiDownloader.js) 전체 복사하기
2. 브라우저에서 개발자 도구 열기 (단축키: `F12` 또는 `Ctrl+Shift+I`)
3. Sources창 - Snippets하위창 열기
4. New snippet으로 tokiDownloader 생성후 붙여넣기. Ctrl+s로 저장한다.
![1~4진행이미지](https://github.com/user-attachments/assets/2f044da0-d0ee-4a32-9f73-2080d4d536e4)
5. 다운받을 목록 페이지에서 tokiDownload()함수 인자 설정후 Ctrl+s로 저장. <br>전체다운: tokiDownload(), 30회차부터 다운: tokiDownload(30), 30회차부터 60회차까지 다운: tokiDownload(30, 60)
6. snippet 실행. 단축키: Ctrl+Enter (snippet에 저장되었으므로 다회성 사용 가능)
![5to6](https://github.com/user-attachments/assets/ab5dfe4b-14f9-4aec-b845-66c2b052da15)
## 폴더(디렉토리) 구조
뉴토끼, 마나토끼
```
뉴토끼 시작연재이름 ~ 마지막연재이름/
|
├─ 0001 어떤만화-1화/
|   ├─ 어떤만화-1화 image0000.jpg
|  ...
|   └─ 어떤만화-1화 image0015.jpg
├─ 0002 어떤만화-2화/
|   ├─ 어떤만화-2화 image0000.jpg
|  ...
|   └─ 어떤만화-2화 image0030.jpg
...
└─ 0123 어떤만화-123화/
    ├─ 어떤만화-123화 image0000.jpg
   ...
    └─ 어떤만화-123화 image0030.jpg
```
북토끼
```
북토끼 시작연재이름 ~ 마지막연재이름/
|
├─ 0001 어떤소설-1화.txt
├─ 0002 어떤소설-2화.txt
├─ 0003 어떤소설-3화.txt
...
└─ 1234 어떤소설-1234화.txt
```

# 2. 뉴토끼 마나토끼 북토끼 다운로더
## 준비물 
Nodejs
## 설치 방법
```bash
git clone https://github.com/crossSiteKikyo/tokiDownloader.git
cd tokiDownloader
npm install
```
https://github.com/user-attachments/assets/b3879c59-3381-407b-a3a8-ad8bf8d84cbb
## 명령어
```bash
node down -url "URL" [-start STARTINDEX] [-last LASTINDEX]
```
- -url은 필수 입력입니다. 반드시 큰따옴표 안에 넣어주세요.
- -start는 옵션입니다. 받고싶은 회차 시작 번호를 입력하세요. 생략하면 처음부터 받습니다.
- -last는 옵션입니다. 받고싶은 마지막 회차 번호를 입력하세요. 생략하면 마지막까지 받습니다.

처음 명령어를 실행하면 cloudflare captcha가 뜰겁니다. 직접 체크박스를 체크해주세요.

https://github.com/user-attachments/assets/615133d6-d995-488d-98f1-7f3cbf8df887

## 폴더(디렉토리) 구조
```
뉴토끼/
├─ 웹툰이름1/
│   ├─ 0001 어떤웹툰-1화/
│   │   ├─ 0001 어떤웹툰-1화 image0000.jpg
│   │   ├─ 0001 어떤웹툰-1화 image0001.jpg
│   │   ...
│   │   └─ 0001 어떤웹툰-1화 image0024.jpg
│   └─ 0002 어떤웹툰-2화/
│       ├─ 0002 어떤웹툰-2화 image0000.jpg
│       ├─ 0002 어떤웹툰-2화 image0001.jpg
│       ...
│       └─ 0002 어떤웹툰-2화 image0020.jpg
└─ 웹툰이름2/

마나토끼/
├─ 만화이름1/
│   ├─ 0001 어떤만화-1화/
│   │   ├─ 0001 어떤만화-1화 image0000.jpg
│   │   ├─ 0001 어떤만화-1화 image0001.jpg
│   │   ...
│   │   └─ 0001 어떤만화-1화 image0015.jpg
│   └─ 0002 어떤만화-2화/
│       ├─ 0002 어떤만화-2화 image0000.jpg
│       ├─ 0002 어떤만화-2화 image0001.jpg
│       ...
│       └─ 0002 어떤만화-2화 image0032.jpg
└─ 만화이름2/

북토끼/
├─ 소설이름1/
│   ├─ 0001 어떤소설-1화.txt
│   ├─ 0001 어떤소설-2화.txt
│   ...
│   └─ 0002 어떤소설-20화.txt
└─ 소설이름2/
```
## 질문
### 오류 또는 개선사항 문의 
[issue](https://github.com/crossSiteKikyo/tokiDownloader/issues) 에 제보해주세요. 익명으로 제보하고싶다면 [블로그](https://whitebearwow.blogspot.com/2024/08/tokidownloader.html) 에 댓글을 남겨주세요.
### cloudflare captcha 자동으로 체크해주실 수 없나요?
현재 라이브러리를 사용해 자동 체크 기능을 사용할경우 이상한게 클릭되는 오류가 있습니다. 직접 클릭해주세요.
