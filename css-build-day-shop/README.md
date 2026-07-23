# อธิบายโปรเจกต์ `ctrlaltnate_ shop`

โปรเจกต์นี้เป็นหน้าเว็บร้านค้า/หน้าแนะนำสินค้าเทคโนโลยีแบบหน้าเดียว (Single-page Product Showcase) แสดงสินค้าจาก 3 แบรนด์ ได้แก่ Apple, Vivo และ Samsung โดยใช้เพียง **HTML + CSS** ไม่มีไฟล์ JavaScript แยก

ไฟล์หลักมี 2 ไฟล์:

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | กำหนดโครงสร้าง เนื้อหา รูปภาพ เมนู ลิงก์ และการแบ่ง section |
| `styles.css` | กำหนดหน้าตา สี ขนาด ระยะห่าง การจัดวาง Animation และ Responsive Design |

---

## 1. ภาพรวมการทำงาน

เมื่อเปิด `index.html` เบราว์เซอร์จะทำงานตามลำดับดังนี้

1. อ่านโครงสร้าง HTML และข้อมูลใน `<head>`
2. โหลด `styles.css` ผ่าน `<link rel="stylesheet" href="styles.css">`
3. `styles.css` โหลดฟอนต์ Google Sans จาก Google Fonts อีกทอดหนึ่ง
4. เบราว์เซอร์สร้างแถบนำทางแบบลอยอยู่ด้านบน
5. แสดง Hero Banner เต็มหน้าจอ
6. แสดง section สินค้า Apple, Vivo และ Samsung ตามลำดับ
7. เมื่อกดชื่อแบรนด์ในเมนู เบราว์เซอร์จะเลื่อนไปยัง `id` ของแบรนด์นั้นแบบนุ่มนวล
8. เมื่อกดปุ่ม `Learn more` หรือ `Buy` จะเปิดเว็บไซต์ภายนอกในแท็บใหม่
9. เมื่อหน้าจอกว้างไม่เกิน `768px` รูปแบบจะเปลี่ยนจาก Desktop เป็น Mobile

โครงสร้างหน้าโดยย่อ:

```text
body
├── แถบนำทาง .top-nav (fixed)
│   ├── โลโก้ .left-nav
│   └── เมนู .right-nav
│       ├── เมนู Desktop .pills__selector
│       └── เมนู Mobile .pills__menu-dropdown
├── Hero Banner .highlight-products
├── Apple .brand-section
│   ├── หัวข้อ #Apple.header-section
│   └── การ์ดสินค้า 4 ใบ
├── Vivo .brand-section
│   ├── หัวข้อ #Vivo.header-section
│   └── การ์ดสินค้า 4 ใบ
└── Samsung .brand-section
    ├── หัวข้อ #Samsung.header-section
    └── การ์ดสินค้า 4 ใบ
```

---

## 2. อธิบาย `index.html`

### 2.1 ส่วนประกาศเอกสารและ `<head>`

```html
<!DOCTYPE html>
<html lang="en">
```

- `<!DOCTYPE html>` บอกเบราว์เซอร์ว่าเอกสารนี้ใช้มาตรฐาน HTML5
- `<html lang="en">` ระบุว่าภาษาหลักของหน้าเป็นภาษาอังกฤษ ช่วย Browser, Screen Reader และ Search Engine เข้าใจเนื้อหา

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- `charset="UTF-8"` ทำให้รองรับภาษาไทยและอักขระพิเศษ
- `viewport` ทำให้ความกว้างหน้าเว็บเท่ากับความกว้างอุปกรณ์ จึงทำ Responsive Design บนมือถือได้ถูกต้อง

```html
<title>ctrlaltnate_ shop</title>
<link rel="stylesheet" href="styles.css">
<link rel="icon" type="image/x-icon" href="...">
```

- `<title>` คือชื่อที่แสดงบนแท็บเบราว์เซอร์
- `<link rel="stylesheet">` เรียก CSS จากไฟล์ที่อยู่โฟลเดอร์เดียวกัน
- `<link rel="icon">` ใช้รูปออนไลน์จาก Icons8 เป็นไอคอนของแท็บ

### 2.2 แถบนำทาง `.top-nav`

```html
<div class="top-nav">
    <div class="left-nav">...</div>
    <div class="right-nav">...</div>
</div>
```

แบ่งเป็น 2 ฝั่ง:

- `.left-nav` เป็นโลโก้ `ctrlaltnate_`
- `.right-nav` เป็นเมนูเลือก Apple, Vivo และ Samsung

โลโก้ใช้ลิงก์ `href="#"` ซึ่งพากลับไปด้านบนของหน้า ส่วน `_` อยู่ใน `<span class="blink-char">` เพื่อใส่ Animation กะพริบ

#### เมนู Desktop

```html
<div class="pills__selector">
    <p><a href="#Apple">Apple</a></p>
    ...
</div>
```

- ลิงก์ `href="#Apple"` จะค้นหา element ที่มี `id="Apple"`
- หลักการเดียวกันใช้กับ `#Vivo` และ `#Samsung`
- รูปร่างเมนูเป็นแบบ pill หรือแคปซูล

#### เมนู Mobile

```html
<details class="pills__menu-dropdown">
    <summary></summary>
    <div class="menu-popup">...</div>
</details>
```

- `<details>` มีพฤติกรรมเปิด/ปิดในตัว จึงไม่ต้องเขียน JavaScript สำหรับ toggle เมนู
- `<summary>` เป็นปุ่มเปิดเมนู แต่ไม่มีข้อความ เพราะ CSS ใส่ไอคอน hamburger เป็น background image
- เมื่อกดลิงก์ มี inline JavaScript สั้น ๆ:

```html
onclick="this.closest('details').removeAttribute('open')"
```

ความหมายคือ หลังคลิกลิงก์ให้หา `<details>` ที่ครอบอยู่ แล้วลบ attribute `open` เพื่อปิด popup เมนู ดังนั้นโปรเจกต์ไม่มีไฟล์ JavaScript แต่มี JavaScript เล็กน้อยเขียนอยู่ใน HTML

### 2.3 Hero Banner `.highlight-products`

```html
<div class="highlight-products">
    <img ...>
    <div class="highlight-text-content">
        <h2>iPhone 17 Pro<br />Series</h2>
        <p>...</p>
    </div>
</div>
```

ส่วนนี้เป็นภาพสินค้าเด่นด้านบน:

- `<img>` เป็นรูปพื้นหลังที่กินพื้นที่ของ Hero
- `.highlight-text-content` เป็นข้อความที่วางทับบนรูป
- `<br />` บังคับขึ้นบรรทัดใหม่ระหว่าง `iPhone 17 Pro` กับ `Series`
- CSS ใช้ `position: relative` ที่ container และ `position: absolute` ที่ข้อความ เพื่อระบุตำแหน่งซ้ายล่าง
- pseudo-element `.highlight-products::before` สร้างชั้นกระจกเบลอไล่ระดับครึ่งล่าง ช่วยให้ข้อความสีขาวอ่านง่ายขึ้น

### 2.4 โครงสร้างของแต่ละแบรนด์

แต่ละแบรนด์ใช้โครงสร้างเดียวกัน:

```html
<div class="brand-section">
    <div id="ชื่อแบรนด์" class="header-section">
        <h2>ชื่อแบรนด์</h2>
    </div>
    <div class="content-row">
        <div class="content-columns">
            <div class="column">สินค้า</div>
            <div class="column">สินค้า</div>
        </div>
        <div class="content-columns">
            <div class="column">สินค้า</div>
            <div class="column">สินค้า</div>
        </div>
    </div>
</div>
```

ลำดับชั้นการจัดวาง:

- `.brand-section` ครอบพื้นที่ทั้งแบรนด์และกำหนดสีพื้นหลังผ่าน inline style
- `.header-section` ครอบหัวข้อแบรนด์และเป็นตำแหน่งปลายทางของเมนู
- `.content-row` เรียงกลุ่มการ์ดเป็นแนวตั้ง 2 แถว
- `.content-columns` เรียงการ์ด 2 ใบในแนวนอน
- `.column` คือการ์ดสินค้า 1 ใบ

จำนวนการ์ด:

| แบรนด์ | แถวแรก | แถวที่สอง |
|---|---|---|
| Apple | iPhone 17 Pro, iPad Pro | MacBook Pro, Watch Ultra 3 |
| Vivo | X Fold 5, X300 Ultra | X300 Pro, TWS Buds 3 Pro |
| Samsung | Galaxy Buds4 Pro, Galaxy S26 Ultra | Galaxy Z Fold 7, Galaxy Tab S11 Ultra |

### 2.5 รูปแบบการ์ดสินค้า 2 ชนิด

#### ชนิดที่ 1: การ์ดพื้นขาว/พื้นสีและรูปสินค้าแยกจากเนื้อหา

```html
<div class="column">
    <div class="sub-header ...">...</div>
    <div class="header-title">...</div>
    <div class="header-text">...</div>
    <img src="..." alt="...">
    <div class="btn-wrapper">...</div>
</div>
```

องค์ประกอบไหลตาม document flow จากบนลงล่าง ยกเว้น `.btn-wrapper` ซึ่งถูกตรึงไว้ขวาล่างด้วย absolute positioning

การ์ด iPhone เพิ่ม inline style:

```html
style="background: linear-gradient(to top, #ff6f00 0%, black);"
```

จึงได้พื้นหลังไล่สีจากส้มด้านล่างไปดำด้านบน

#### ชนิดที่ 2: การ์ดรูปเต็มพื้นหลัง `.column-bg-card`

```html
<div class="column column-bg-card">
    <img class="bg-img" ...>
    <div class="card-content">
        ...ข้อความและปุ่ม...
    </div>
</div>
```

- `.bg-img` ถูกวางแบบ absolute ให้เต็มการ์ด
- `.card-content` อยู่เป็นชั้นเนื้อหาด้านหน้า
- ข้อความมี `z-index: 2`
- ปุ่มมี `z-index: 20`
- การ์ดมี `overflow: hidden` จึงตัดส่วนของรูปที่เกินมุมโค้งออก
- `object-fit: cover` ทำให้รูปเต็มพื้นที่ อาจมีบางส่วนของรูปถูก crop เพื่อรักษาสัดส่วน

### 2.6 ข้อความและคลาสเสริมในการ์ด

```html
<div class="sub-header sub-header-critical">ON SALES</div>
<div class="header-title header-title-light">iPad Pro</div>
<div class="header-text header-text-light">Thinpossible.</div>
```

ใช้แนวคิด base class + modifier class:

| Base class | หน้าที่ | Modifier class | สิ่งที่เปลี่ยน |
|---|---|---|---|
| `.sub-header` | ป้ายหมวดสินค้า | `.sub-header-light` | เปลี่ยนตัวอักษรเป็นสีขาว |
| `.sub-header` | ป้ายหมวดสินค้า | `.sub-header-critical` | เปลี่ยนพื้นเป็นสีส้มและมุมโค้งมากขึ้น |
| `.header-title` | ชื่อสินค้า | `.header-title-light` | เปลี่ยนตัวอักษรเป็นสีขาว |
| `.header-text` | คำอธิบายสินค้า | `.header-text-light` | เปลี่ยนตัวอักษรเป็นสีขาว |

การใช้ modifier ทำให้ไม่ต้องสร้าง CSS ซ้ำทั้งชุดสำหรับทุกการ์ด

### 2.7 ปุ่ม `Learn more` และ `Buy`

```html
<div class="btn-wrapper">
    <a href="..." target="_blank" class="btn-learn">Learn more</a>
    <a href="..." target="_blank" class="btn-buy">Buy</a>
</div>
```

- `.btn-wrapper` จัดปุ่มเป็นแนวนอนด้วย Flexbox
- `.btn-learn` เป็นปุ่มพื้นขาว
- `.btn-buy` เป็นปุ่มพื้นส้ม
- `target="_blank"` เปิดปลายทางในแท็บใหม่
- ทั้งสองเป็น `<a>` จึงเป็นลิงก์ที่ตกแต่งให้ดูเหมือนปุ่ม ไม่ใช่ `<button>`

---

## 3. อธิบาย `styles.css` ตามส่วน

### 3.1 เรียกใช้ Google Font

```css
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:...');
```

โหลดฟอนต์ Google Sans จากอินเทอร์เน็ต จากนั้นนำไปใช้กับ `body`:

```css
body {
    font-family: Google Sans, sans-serif;
}
```

ถ้าโหลด Google Sans ไม่สำเร็จ เบราว์เซอร์จะใช้ฟอนต์กลุ่ม `sans-serif` ของระบบแทน

### 3.2 CSS Reset

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

- ลบ margin และ padding เริ่มต้นของทุก element เพื่อควบคุมระยะเอง
- `box-sizing: border-box` ทำให้ `width` และ `height` รวม padding กับ border อยู่แล้ว คำนวณขนาดง่ายขึ้น

### 3.3 Smooth Scroll และพื้นฐานของหน้า

```css
html { scroll-behavior: smooth; }
```

ทำให้การกระโดดจากเมนู `#Apple`, `#Vivo`, `#Samsung` กลายเป็นการเลื่อนอย่างนุ่มนวล

`body` กำหนดฟอนต์และพื้นหลังเทาอ่อน `#f1f1f1`

### 3.4 การจัดวาง Navigation

`.top-nav` ใช้ Flexbox:

```css
display: flex;
justify-content: space-between;
align-items: center;
```

- `display: flex` เปิดใช้ Flexbox
- `justify-content: space-between` ดันโลโก้ไปซ้ายและเมนูไปขวา
- `align-items: center` จัดให้อยู่กึ่งกลางแนวตั้ง

การวางตำแหน่ง:

```css
position: fixed;
top: 20px;
left: 50%;
transform: translateX(-50%);
width: 90%;
z-index: 1000;
```

- `fixed` ทำให้ nav ติดตาม viewport แม้เลื่อนหน้า
- `left: 50%` วางขอบซ้ายที่กึ่งกลาง
- `translateX(-50%)` ดึงกลับครึ่งหนึ่งของความกว้างตัวเอง จึงอยู่กลางหน้าพอดี
- `z-index: 1000` ทำให้อยู่เหนือเนื้อหาและรูปสินค้า
- `backdrop-filter: blur(22px)` เบลอสิ่งที่อยู่ด้านหลัง เกิดลักษณะ glassmorphism
- `border-radius: 50px` ทำให้แถบเป็นทรงแคปซูล

### 3.5 โลโก้และ Animation

`.left-nav` เป็น Flexbox เช่นกัน เพื่อจัดข้อความกึ่งกลางทั้งสองแกน มีพื้นดำและขอบโค้ง

```css
.blink-char {
    animation: blink 0.5s infinite;
}
```

เรียก animation ชื่อ `blink` ใช้เวลา 0.5 วินาทีและเล่นวนไม่สิ้นสุด

```css
@keyframes blink {
    0%   { opacity: 1; }
    50%  { opacity: 0; }
    100% { opacity: 1; }
}
```

ขีดล่างจะค่อย ๆ เปลี่ยนจากมองเห็น → โปร่งใส → มองเห็น คล้าย cursor ใน Terminal

### 3.6 เมนู Desktop และสถานะ Interaction

`.pills__selector` ใช้ Flexbox เรียงเมนูแนวนอน ส่วนลิงก์มี transition:

```css
transition: all 0.3s ease;
```

เมื่อ `hover`, `focus` หรือ `active` พื้นจะเปลี่ยนเป็นดำและตัวอักษรเป็นขาวในเวลา 0.3 วินาที รองรับทั้งเมาส์และ keyboard focus

### 3.7 Dropdown บน Mobile

ตามค่าเริ่มต้น:

```css
.pills__menu-dropdown { display: none; }
```

จึงซ่อนบนจอ Desktop และจะเปลี่ยนเป็น `display: block` ใน media query

ไอคอน hamburger ไม่ได้ใช้ไฟล์รูปแยก แต่เป็น SVG ที่เข้ารหัสไว้ใน CSS ผ่าน `data:image/svg+xml,...` และใช้เป็น `background-image` ของ `<summary>`

`.menu-popup` ใช้:

- `position: absolute` วางอ้างอิงกับ `<details>`
- `top: 44px; right: 0` แสดงใต้ปุ่มและชิดขวา
- `flex-direction: column` เรียงลิงก์ในแนวตั้ง
- `z-index: 2000` อยู่เหนือ nav และเนื้อหาอื่น

### 3.8 Hero แบบเต็มหน้าจอ

`.highlight-products` มี `height: 100vh` หมายถึงสูงเท่ากับ viewport 100% และ `min-height: 480px` ป้องกันไม่ให้เตี้ยเกินไป

รูป Hero ใช้:

```css
width: 100%;
height: 100%;
object-fit: cover;
object-position: center top;
```

- รูปเต็ม container ทั้งกว้างและสูง
- `cover` รักษาสัดส่วนและ crop ส่วนเกิน
- `center top` ให้ความสำคัญกับส่วนบนตรงกลางของภาพ

ข้อความใช้ absolute positioning:

```css
bottom: 8%;
left: 8%;
```

จึงวางห่างจากขอบซ้ายและขอบล่างตามเปอร์เซ็นต์ของ Hero

ขนาดตัวอักษรใช้ `clamp()` เช่น:

```css
font-size: clamp(28px, 6.5vw, 95px);
```

หมายถึงขนาดต่ำสุด 28px, ขนาดยืดหยุ่นตามความกว้างหน้าจอ 6.5vw และสูงสุดไม่เกิน 95px

### 3.9 Overlay ด้วย pseudo-element

`.highlight-products::before` สร้าง element เสมือนโดยไม่ต้องเพิ่ม HTML:

- ครอบครึ่งล่างด้วย `height: 50%`
- ใช้พื้นโปร่งใสและ `backdrop-filter: blur(20px)`
- `mask-image: linear-gradient(...)` ทำให้ blur ค่อย ๆ เข้มขึ้นจากบนลงล่าง
- `z-index: 1` อยู่เหนือรูป แต่ข้อความมี `z-index: 10` จึงยังอยู่ด้านบนสุด

ลำดับชั้น Hero:

```text
ข้อความ (z-index: 10)
ชั้นเบลอ ::before (z-index: 1)
รูปภาพ (document flow)
```

### 3.10 Brand Section และ Grid ที่สร้างด้วย Flexbox

โปรเจกต์นี้ไม่ได้ใช้ CSS Grid แต่สร้าง layout 2 คอลัมน์ด้วย Flexbox:

```css
.content-row {
    display: flex;
    flex-direction: column;
}

.content-columns {
    display: flex;
}

.column {
    flex: 1;
}
```

- `.content-row` เรียงแต่ละแถวลงด้านล่าง
- `.content-columns` เรียงการ์ดภายในแถวนั้นจากซ้ายไปขวา
- `.column { flex: 1; }` ทำให้การ์ด 2 ใบแบ่งพื้นที่ที่เหลือเท่ากัน
- `gap: 50px` เป็นช่องว่างระหว่างการ์ด
- `padding: 0 50px` เว้นขอบซ้ายและขวาของทั้งแถว

บน Desktop ภาพรวมจึงเทียบได้กับตาราง 2 × 2 ต่อแบรนด์ แต่สร้างจาก Flexbox ซ้อนกัน 2 ระดับ

### 3.11 รูปทรงและตำแหน่งภายในการ์ด

`.column` มีความสูงคงที่ `550px`, padding `50px`, มุมโค้ง `50px` และ `position: relative`

เหตุผลที่ใช้ `position: relative` คือทำให้ element ลูกที่เป็น `position: absolute` อ้างอิงขอบของการ์ด ไม่ใช่อ้างอิงทั้งหน้า

ปุ่มถูกวางที่:

```css
.column .btn-wrapper {
    position: absolute;
    bottom: 50px;
    right: 50px;
}
```

จึงอยู่ขวาล่างคงที่ ไม่ว่าข้อความหรือรูปด้านบนจะยาวเท่าใด

รูปทั่วไปใช้ `object-fit: contain` เพื่อแสดงรูปครบโดยไม่ crop และ `drop-shadow()` สร้างเงาตามรูปร่างส่วนที่ไม่โปร่งใสของภาพ

### 3.12 Card Background และ Layering

สำหรับ `.column-bg-card`:

```css
.column-bg-card .bg-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}
```

รูปจึงเต็มการ์ดและกลายเป็น background เชิงพฤติกรรม แม้ใน HTML จะยังเป็น `<img>` จริง

```css
.column-bg-card .card-content > *:not(.btn-wrapper) {
    position: relative;
    z-index: 2;
}
```

selector นี้เลือก “ลูกโดยตรงทุกตัวของ `.card-content` ยกเว้น `.btn-wrapper`” แล้วดันข้อความขึ้นมาอยู่เหนือภาพ ส่วนปุ่มมี `z-index: 20` จาก rule ของ `.column .btn-wrapper` อยู่แล้ว

### 3.13 Typography และปุ่ม

- `.sub-header` เป็น badge ตัวพิมพ์ใหญ่ด้วย `text-transform: uppercase` และเพิ่มระยะตัวอักษรด้วย `letter-spacing`
- `.header-title` ขนาด 48px น้ำหนัก 700
- `.header-text` ขนาด 24px สีเทา
- กลุ่มคลาส `-light` ใช้เมื่อตัวอักษรอยู่บนรูปหรือพื้นมืด
- `.btn-learn` และ `.btn-buy` ใช้ padding, สี และ `border-radius: 30px` เพื่อให้เหมือนปุ่มแคปซูล

---

## 4. Responsive Design

Breakpoint หลักมีจุดเดียว:

```css
@media (max-width: 768px) { ... }
```

กฎข้างในจะทำงานเมื่อ viewport กว้างไม่เกิน 768px โดยเปลี่ยนดังนี้:

| ส่วน | Desktop | Mobile ≤ 768px |
|---|---|---|
| เมนูแบรนด์ | pill 3 รายการ | ซ่อนและแสดง hamburger dropdown |
| โลโก้ | 24px | 18px |
| Navigation | กว้าง 90%, สูง 60px | กว้าง 92%, สูง 50px |
| Hero | สูง 100vh | สูง 60vh และอย่างน้อย 400px |
| แถวสินค้า | 2 คอลัมน์ | 1 คอลัมน์ |
| ช่องว่างระหว่างการ์ด | 50px | 24px |
| Padding ขอบแถว | 50px | 20px |
| การ์ด | สูง 550px, padding 50px | สูง 520px, padding 35px 28px |
| ชื่อสินค้า | 48px | 32px |
| รายละเอียดสินค้า | 24px | 16px |

จุดสำคัญที่สุดคือ:

```css
.content-columns {
    flex-direction: column;
}
```

เมื่อเปลี่ยนแกน Flexbox จากค่าเริ่มต้น `row` เป็น `column` การ์ดที่เคยวางคู่กันจะเรียงลงมาใบละหนึ่งแถว และ `.column { width: 100%; }` ทำให้เต็มความกว้างที่มี

เฉพาะรูปของการ์ดปกติใช้:

```css
.column:not(.column-bg-card) img { ... }
```

selector นี้เลือก `.column` ที่ไม่มี class `.column-bg-card` แล้วจำกัดรูปสูงสุดไว้ที่ 230px เพื่อไม่ให้ชนข้อความหรือปุ่มบนมือถือ

---

## 5. การเรียกใช้และทดสอบ

### วิธีที่ 1: เปิดไฟล์โดยตรง

ดับเบิลคลิก `index.html` หรือคลิกขวาแล้วเลือกเปิดด้วย Browser หน้าเว็บสามารถทำงานได้ทันที เพราะไม่มีขั้นตอน build และไม่มี package ที่ต้องติดตั้ง

### วิธีที่ 2: ใช้ VS Code Live Server

1. เปิดโฟลเดอร์ `css-build-day-shop` ใน VS Code
2. ติดตั้ง extension **Live Server** หากยังไม่มี
3. คลิกขวาที่ `index.html`
4. เลือก **Open with Live Server**
5. เมื่อแก้และบันทึกไฟล์ หน้า Browser จะ refresh ให้โดยอัตโนมัติ

### สิ่งที่ต้องใช้อินเทอร์เน็ต

แม้ HTML และ CSS จะเปิดจากเครื่องได้ แต่ทรัพยากรต่อไปนี้โหลดจากภายนอก:

- Google Sans จาก Google Fonts
- favicon จาก Icons8
- รูปสินค้าทั้งหมดจากเว็บไซต์ Apple, Vivo, Samsung และเว็บไซต์ภายนอกอื่น
- เว็บไซต์ปลายทางของปุ่ม `Learn more` และ `Buy`

ถ้าไม่มีอินเทอร์เน็ต โครงสร้างและ CSS ยังแสดงได้ แต่ฟอนต์ รูปภาพ favicon และลิงก์ภายนอกอาจใช้งานไม่ได้

### Checklist สำหรับทดสอบ

1. เปิดหน้าจอ Desktop แล้วตรวจว่า nav ลอยติดด้านบน
2. เลื่อนหน้าและตรวจว่า nav ยังอยู่ตำแหน่งเดิม
3. กด Apple, Vivo และ Samsung แล้วตรวจว่าเลื่อนไป section ถูกต้อง
4. ลอง hover เมนูและดูการเปลี่ยนสี
5. ตรวจ `_` ที่โลโก้ว่ากะพริบ
6. กด `Learn more` และ `Buy` แล้วตรวจว่าเปิดแท็บใหม่
7. เปิด DevTools และปรับ viewport ให้กว้างไม่เกิน 768px
8. ตรวจว่าเมนู pill เปลี่ยนเป็น hamburger
9. เปิด dropdown แล้วกดชื่อแบรนด์ ตรวจว่าเมนูปิดหลังคลิก
10. ตรวจว่าการ์ดเปลี่ยนจาก 2 คอลัมน์เป็น 1 คอลัมน์

---

## 6. CSS แบ่งเป็นหมวดอย่างไร

แม้ไฟล์ปัจจุบันไม่ได้เขียน comment คั่น แต่สามารถอธิบายการแบ่งเชิงหน้าที่ได้ 9 หมวด:

1. **External resource** — `@import` ฟอนต์
2. **Global reset/base** — `*`, `html`, `body`
3. **Navigation** — `.top-nav`, `.left-nav`, `.right-nav`
4. **Animation** — `.blink-char`, `@keyframes blink`
5. **Desktop/Mobile menus** — `.pills__selector`, `.pills__menu-dropdown`, `.menu-popup`
6. **Hero** — `.highlight-products`, `.highlight-text-content`, `::before`
7. **Section layout** — `.brand-section`, `.header-section`, `.content-row`, `.content-columns`
8. **Product cards/components** — `.column`, `.column-bg-card`, typography, badges และ buttons
9. **Responsive overrides** — `@media (max-width: 768px)`

แนวคิดสำคัญคือ CSS แบ่งตาม component ของหน้า และใช้ class ซ้ำกับสินค้าทุกแบรนด์ ทำให้การ์ดทั้ง 12 ใบมีรูปแบบสม่ำเสมอโดยไม่ต้องเขียน CSS แยกทีละใบ

---

## 7. Inline CSS ที่มีใน HTML

โปรเจกต์เก็บ CSS ส่วนใหญ่ใน `styles.css` แต่มี style เฉพาะจุดใน HTML:

```html
<div class="brand-section" style="background-color: ...">
```

ใช้กำหนดสีพื้นหลังเฉพาะของแต่ละแบรนด์:

- Apple: เทา `rgb(230, 230, 230)`
- Vivo: ฟ้าอ่อน `rgb(170, 199, 255)`
- Samsung: เทาเกือบขาว `rgb(245, 245, 245)`

หัวข้อ Vivo และ Samsung ก็ใช้ inline style เพื่อกำหนดสีเฉพาะแบรนด์ ส่วนการ์ด iPhone ใช้ inline gradient

Inline style มี specificity สูงกว่า class CSS ทั่วไป จึง override สีเดิมจาก `.header-section h2` หรือ `.column` ได้

---

## 8. Selector สำคัญที่ควรอธิบายได้

| Selector | เลือกอะไร |
|---|---|
| `*` | ทุก element |
| `.left-nav a` | `<a>` ที่อยู่ภายใน `.left-nav` |
| `.pills__selector p a:hover` | ลิงก์เมนูที่เมาส์ชี้อยู่ |
| `.pills__menu-dropdown summary::-webkit-details-marker` | marker เริ่มต้นของ `<summary>` บน WebKit |
| `.highlight-products::before` | element เสมือนก่อนเนื้อหา Hero |
| `.column .btn-wrapper` | `.btn-wrapper` ที่อยู่ภายใน `.column` |
| `.column-bg-card .card-content > *:not(.btn-wrapper)` | ลูกโดยตรงทุกตัว ยกเว้นกลุ่มปุ่ม |
| `.column:not(.column-bg-card) img` | รูปในการ์ดปกติที่ไม่ใช่ background card |
| `@media (max-width: 768px)` | กฎที่ทำงานเฉพาะจอกว้างไม่เกิน 768px |

---

## 9. จุดเด่นทางเทคนิค

- ใช้ Semantic behavior ของ `<details>` และ `<summary>` สร้าง dropdown โดยไม่ต้องมี JavaScript สำหรับเปิด/ปิด
- ใช้ anchor link + `scroll-behavior: smooth` สร้าง navigation ภายในหน้า
- ใช้ Flexbox ซ้อนกันสร้าง layout 2 × 2 และแปลงเป็น 1 คอลัมน์บนมือถือ
- ใช้ `clamp()` ทำ typography แบบ fluid
- ใช้ `object-fit: cover` สำหรับภาพเต็มพื้นที่ และ `contain` สำหรับภาพสินค้าที่ต้องเห็นครบ
- ใช้ absolute positioning และ `z-index` สร้าง layer รูป ข้อความ overlay และปุ่ม
- ใช้ `backdrop-filter` และ gradient mask สร้าง glass/blur effect
- ใช้ base class ร่วมกับ modifier class ลด CSS ซ้ำ
- ใช้ SVG data URL ทำไอคอน hamburger โดยไม่เพิ่มไฟล์รูป

---

## 10. จุดที่ควรระวังและข้อสังเกต

### 10.1 ข้อความราคาใน Hero แสดงอักขระผิด

ในไฟล์มีข้อความ:

```text
Start at โฌ1.299 - Available 27 September
```

ส่วน `โฌ` ดูเหมือนอักขระสกุลเงินที่ encoding ผิด และ `1.299` อาจตั้งใจใช้รูปแบบราคาอื่น ควรตรวจต้นฉบับก่อนนำเสนอหรือเผยแพร่จริง

### 10.2 Link และชื่อรุ่นบางรายการไม่ตรงกัน

ตัวอย่างเช่นชื่อบนการ์ดเป็น iPhone 17 Pro แต่ URL ไปหน้า iPhone 16 Pro และบางรุ่นใหม่ใช้ URL ของรุ่นก่อนหน้า ควรบอกว่าเป็นข้อมูลตัวอย่าง หรือแก้ URL ให้สัมพันธ์กับชื่อสินค้า

### 10.3 รูปทั้งหมดเป็น URL ภายนอก

เจ้าของเว็บไซต์ภายนอกอาจเปลี่ยน URL, ป้องกัน hotlink หรือเอารูปออกได้ ทำให้รูปหาย ควรดาวน์โหลด asset ที่มีสิทธิ์ใช้งานมาเก็บในโปรเจกต์หากจะ deploy จริง

### 10.4 ปุ่ม Mobile มีเรื่อง CSS specificity

ใน Desktop มี:

```css
.column .btn-wrapper {
    bottom: 50px;
    right: 50px;
}
```

แต่ใน media query ใช้:

```css
.btn-wrapper {
    bottom: 30px;
    right: 28px;
}
```

selector `.column .btn-wrapper` มี specificity สูงกว่า `.btn-wrapper` ดังนั้นค่า Mobile อาจไม่ override ค่า Desktop แม้เขียนไว้ภายหลัง หากต้องการให้ทำงานแน่นอนควรใช้ `.column .btn-wrapper` ใน media query เช่นกัน

### 10.5 Fixed nav อาจบังหัวข้อเมื่อใช้ anchor

เมื่อกดลิงก์ `#Apple` เบราว์เซอร์เลื่อน element ที่มี id ไปชิดด้านบน แต่ nav เป็น `position: fixed` จึงมีโอกาสบังเนื้อหาบางส่วน สามารถปรับปรุงด้วย `scroll-margin-top` ที่ `.header-section`

### 10.6 Accessibility

- `<summary>` ไม่มีข้อความหรือ `aria-label` จึงอาจไม่ชัดเจนสำหรับ Screen Reader
- `alt` ของรูปมีแล้ว ซึ่งเป็นข้อดี แต่บางข้อความ alt ระบุรุ่นไม่ตรงชื่อที่แสดง
- Animation กะพริบไม่มี `prefers-reduced-motion` สำหรับผู้ใช้ที่ขอให้ลดการเคลื่อนไหว
- ลิงก์ที่เปิดแท็บใหม่ควรสื่อให้ผู้ใช้ทราบ และมักเพิ่ม `rel="noopener noreferrer"`

### 10.7 Browser support

`backdrop-filter` และ `mask-image` อาจแสดงผลต่างกันในเบราว์เซอร์เก่า ควรทดสอบ Chrome, Edge, Firefox และ Safari หากต้องรองรับหลายแพลตฟอร์ม

---

## 11. แนวพูดพรีเซนต์แบบเป็นลำดับ

สามารถนำเสนอประมาณนี้:

1. “โปรเจกต์นี้เป็นหน้า Product Showcase แบบหน้าเดียว ใช้ HTML สร้างโครงสร้าง และ CSS ดูแลหน้าตากับ responsive”
2. “ด้านบนเป็น fixed navigation แบ่งซ้าย-ขวาด้วย Flexbox และมี glassmorphism จาก backdrop blur”
3. “เมนูเชื่อมไปยัง id ของแต่ละแบรนด์ และ HTML เปิด smooth scroll จาก CSS”
4. “Desktop แสดงเมนู pill ส่วน Mobile ใช้ details/summary เป็น dropdown โดยไม่ต้องมีไฟล์ JavaScript”
5. “Hero สูงเต็ม viewport ใช้ object-fit cover และวางข้อความทับรูปด้วย absolute positioning”
6. “สินค้าแต่ละแบรนด์ใช้ component ชุดเดียวกัน แบ่งเป็น 2 แถว แถวละ 2 การ์ดด้วย Flexbox”
7. “การ์ดมี 2 แบบ คือรูปสินค้าอยู่ใน flow และรูปเต็มพื้นหลังแบบ overlay”
8. “ข้อความ ป้าย และปุ่มใช้ base class กับ modifier class เช่น light และ critical เพื่อ reuse CSS”
9. “เมื่อจอไม่เกิน 768px แถวเปลี่ยนเป็น column การ์ดจึงเรียงหนึ่งใบต่อแถว พร้อมลดขนาดตัวอักษรและระยะห่าง”
10. “การกดปุ่มสินค้าเป็น external link และเปิดแท็บใหม่ ส่วน asset ทั้งหมดตอนนี้โหลดจากอินเทอร์เน็ต”

---

## 12. สรุปสั้น ๆ

- **HTML ทำอะไร:** สร้าง nav, Hero, section แบรนด์, การ์ดสินค้า รูป ข้อความ และลิงก์
- **CSS ทำอะไร:** reset ค่าเริ่มต้น กำหนดฟอนต์ สี ขนาด layout, animation, overlay, responsive และ interaction
- **Layout หลัก:** Flexbox สำหรับ nav และกลุ่มการ์ด, absolute positioning สำหรับ overlay และปุ่ม
- **Responsive:** breakpoint ที่ 768px เปลี่ยนเมนูและการ์ดจากแนวนอนเป็นแนวตั้ง
- **การนำทาง:** anchor link เชื่อม `href="#Brand"` กับ `id="Brand"` และเลื่อนแบบ smooth
- **การเรียกใช้:** เปิด `index.html` ได้ทันที หรือใช้ Live Server โดยไม่ต้อง build/install dependencies

