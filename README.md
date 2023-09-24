## &nbsp;&nbsp;&nbsp;&nbsp;Các bước cài đặt trước khi có thể test

### &nbsp;&nbsp;&nbsp;&nbsp;1. Cài đặt NodeJS

### &nbsp;&nbsp;&nbsp;&nbsp;2. Thiết lập môi trường

&nbsp;&nbsp;&nbsp;&nbsp;Tạo file `.env` với nội dung:
```c
VUE_APP_PORT=1234
```
&nbsp;&nbsp;&nbsp;&nbsp;Port 1234 là port của backend chạy song song với Vue.

### &nbsp;&nbsp;&nbsp;&nbsp;3. Chạy trên Terminal

&nbsp;&nbsp;&nbsp;&nbsp;Dùng Terminal navigate vào folder chính (folder `AOTS`) và dùng commandline chạy các dòng lệnh:
```c
npm install
```
```c
npm run serve
```

&nbsp;&nbsp;&nbsp;&nbsp;Sau khi chạy dòng lệnh trên, màn hình console nên in ra những dòng tựa như sau:
```c
App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.0.100:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```
&nbsp;&nbsp;&nbsp;&nbsp;Địa chỉ IP có thể khác nhau trong các lần test khác nhau

### &nbsp;&nbsp;&nbsp;&nbsp;4. Have fun!