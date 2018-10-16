# encryptMe

Chrome extension cho phép bạn mã hóa các message của mình, project này mang tính chất thí nghiệm và học tập.

# Nó hoạt động như thế nào?

Khi bạn viết một nội dung, toàn bộ nội dung của bạn sẽ được mã hóa bằng `AES-128`:

**Dữ liệu đã mã hóa**
```
[encryptMe]x0WCs/fU1CqBpjMPxcmQGmLurq7M18avaDYvOlGJcyY=[/encryptMe]
```
Nếu muốn một cá nhân nào đọc được nội dung này bạn phải share `secret key` với nhóm của mình, sử dụng cách thức trao đổi key `Diffie–Hellman` thông qua một private channel.

Với `secret key` chúng ta có thể đọc được nội dung mà không gặp trở ngại nào. Mặc dù dữ liệu của bạn vẫn được lưu trên server của `Third Party` nhưng đó là cipher text.

**Dữ liệu sau khi giải mã**
```
We are resist to censorship
```
# Chống giám sát dựa trên Proof-of-Work

`secret key` được trao đổi có thể cần phải trải qua một quá trình hash để sinh key thứ cấp, dùng để giải mã.

Ví dụ:
```
SK = H(S || K)
```
Với:
- `SK` là key thứ cấp
- `H` là hash function (Ví dụ: `keccak256`)
- `K` là số bất kì thuộc khoảng `(0, 65535)`

*Quá trình lựa chọn `K` là ngẫu nhiên do đó người giải mã vẫn phải tìm `K` ứng với cipher text `C` nhận được. Nếu muốn tạo một central point để giải mã đó là điều vô cùng tốn kém vào lúc này.*

# Hạn chế

- Không thể tìm kiếm dữ liệu
- Không hoạt động với hình ảnh
- Mất `secret key` sẽ không có khả năng phục hồi nội dung

# Ưu thế

- Để kiểm soát về nội dung cần phải có nguồn lực lớn để giải mã
- Phải tìm ra đúng `secret key` cho mỗi nội dung
- Phải có không gian lớn để capture và cache `secret key` nếu có thể