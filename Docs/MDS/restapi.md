# Arquitectura REST

```
/api
  /



http://www.example.org/locations/us/ny/new_york_city

router.get("/locations/:country/:state/:city", (req, res)=>{
  req.params = {country:"valor", state:"valor", city:"city"}
})

www.example.org : class
  +locations
      ( country , state, city ) {

        newyorkdata = sql(country, stat, city)

        retun newyorkdata
    }