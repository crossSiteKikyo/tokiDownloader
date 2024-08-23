뉴토끼 마나토끼 북토끼 다운로드 스크립트
- 프로그램 설치 불필요
- 정보수집 없음
## 사용법
1. [다운로드 스크립트](https://raw.githubusercontent.com/crossSiteKikyo/tokiDownloader/main/tokiDownloader.js) 전체 복사하기
2. 브라우저에서 개발자 도구 열기 (단축키: `F12` 또는 `Ctrl+Shift+I`)
3. Sources창 - Snippets하위창 열기
4. New snippet으로 tokiDownloader 생성후 붙여넣기. Ctrl+s로 저장한다.
![1~4진행이미지](https://github.com/user-attachments/assets/2f044da0-d0ee-4a32-9f73-2080d4d536e4)
5. 다운받을 목록 페이지에서 tokiDownload()함수 인자 설정후 Ctrl+s로 저장. <br>전체다운: tokiDownload(), 30회차부터 다운: tokiDownload(30), 30회차부터 60회차까지 다운: tokiDownload(30, 60)
6. snippet 실행. 단축키: Ctrl+Enter
![5to6](https://github.com/user-attachments/assets/ab5dfe4b-14f9-4aec-b845-66c2b052da15)
7. 유용한 것 같다면 star 부탁드립니다!
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
## 질문
### 오류 또는 개선사항 문의 
[issue](https://github.com/crossSiteKikyo/tokiDownloader/issues) 에 제보해주세요. 익명으로 제보하고싶다면 [블로그](https://whitebearwow.blogspot.com/2024/08/tokidownloader.html) 에 댓글을 남겨주세요.
### 왜 스크립트로 만들었나요?
axios, selenium, puppeteer로 시도해봤지만 cloudflare를 뚫지 못해 브라우저에서 직접 실행하는 방법으로 만들었습니다.