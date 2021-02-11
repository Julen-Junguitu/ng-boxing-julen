var express = require('express');
const bodyParser = require('body-parser');
const app = express();

class Boxer {
  constructor(
    public id: number,
    public name: string,
    public country: string,
    public age: number,
    public record: string,
    public lastOponents: string[],
    public image: string
  ) { }
}

const boxers: Boxer[] = [
  new Boxer(
    0,
    "Gennady Golovkin",
    "Kazakhstan",
    38,
    "41-1-1",
    ["Kamil Szeremeta", "Sergiy Derevyachenko", "Steve Rolls", "Canelo Alvarez"],
    "https://ca-times.brightspotcdn.com/dims4/default/0a4d9bf/2147483647/strip/true/crop/1813x2048+0+0/resize/840x949!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb5%2F3c%2F1471f89401f7b06078e8b7392e3c%2Fla-esp-canelogolvokin-001"
  ),
  new Boxer(
    1,
    "Vasyl Lomachenko",
    "Ukraine",
    32,
    "14-2-0",
    ["Teofimo Lopez", "Luke Campbell", "Jose Pedraza", "Jorge Linares"],
    "https://as.com/masdeporte/imagenes/2018/05/12/polideportivo/1526158347_375701_1526179834_noticia_normal.jpg"
  )
]





function getBoxers(): any[] {
  return boxers;
}

app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.post('/boxers', bodyParser.json(), (req: any, res: any) => {

  let pNew = new Boxer(
    boxers.length + 1,
    req.body.name,
    req.body.country,
    req.body.age,
    req.body.record,
    req.body.lastOponents,
    req.body.image
  );
  boxers.push(pNew);
  res.status(200).send({ 
    id: pNew.id,
    name: pNew.name,
    country: pNew.country,
    age: pNew.age,
    record: pNew.record,
    lastOponents: pNew.lastOponents,
    image: pNew.image
   });
 
})

app.get('/', (req: any, res: any) => {
  res.send('The URL of boxers is http://localhost:8000/boxers');
});

app.get('/boxers', (req: any, res: any) => {
  res.json(getBoxers());
});


function getBoxersById(boxerId: number): any {
  let p: any;
  p = boxers.find(p => p.id == boxerId);
  return p;
}

app.get('/boxers/:id', (req: any, res: any) => {
  res.json(getBoxersById(parseInt(req.params.id)));
});



function updateBoxersById(req:any, boxerId: number): any {
  let p: any;
  p = boxers.find(p => p.id == boxerId);
  let index = boxers.indexOf(p);

  p.name = req.body.name,
  p.country = req.body.country,
  p.age = req.body.age,
  p.record = req.body.record,
  p.lastOponents = req.body.lastOponents,
  p.image = req.body.image
  
  boxers[index] = p;
  return p;
}

app.put('/boxers/:id', function (req:any, res:any) {
  res.json(updateBoxersById(req, parseInt(req.params.id)));
  res.send('Got a UPDATE request at /user');
});


function deleteBoxersById(boxerId: number): any {
  let p: any;
  p = boxers.find(p => p.id == boxerId);
  let index = boxers.indexOf(p);
  delete boxers[index];
  return p;
}

app.delete('/boxers/:id', function (req:any, res:any) {
  res.json(deleteBoxersById(parseInt(req.params.id)));
  res.send('Got a DELETE request at /user');
});



const server = app.listen(8000, "localhost", () => {
  const { address, port } = server.address();

  console.log('Listening on %s %s', address, port);
});




