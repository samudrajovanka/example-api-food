# Example API Food

## Route

### Untuk mendapatkan data makanan per page (**default page 1**)
> GET `/foods?page=<page>`

### Untuk menambahkan data makanan
> POST `/foods`

Parameter untuk menambahkan makanan
| Body | Type Data |
|------|-----------|
| name | String |
| price | Number |
| expired | String |  

### Untuk memperbarui makanan dengan id makanan tertentu
> PUT `/foods/:foodId`

Parameter untuk memperbarui makanan
| Body | Type Data |
|------| ----------|
| price | Number |

### Untuk menghapus makanan dengan id makanan tertentu
> DELETE `/foods/:foodId` 
