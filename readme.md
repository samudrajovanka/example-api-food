# Example API Food

## Route

### Untuk mendapatkan data makanan per page (**default page 1**)
> GET ```/api/foods?page=<page>```

### Untuk menambahkan data makanan
> POST ```/api/foods```  

Parameter untuk menambahkan makanan
Body | Type Data
---- | ---------
name | String
price | Number
expired | String  

### Untuk memperbarui makanan dengan id makanan tertentu
> PUT ```/api/foods/:foodId```  

Parameter untuk memperbarui makanan
Body | Type Data
---- | ---------
price | Number

### Untuk menghapus makanan dengan id makanan tertentu
> DELETE ```/api/foods/:foodId```  