import { InMemoryDbService } from 'angular-in-memory-web-api';

export class BoxerData implements InMemoryDbService {

  createDb() {
    let boxers = [
      {
        "id": 0,
        "name": "Gennady Golovkin",
        "country": "Kazakhstan",
        "age": 38,
        "record": "41-1-0",
        "lastOponents": ["Kamil Szeremeta", "Sergiy Derevyachenko", "Steve Rolls", "Canelo Alvarez"],
        "image": "https://ca-times.brightspotcdn.com/dims4/default/0a4d9bf/2147483647/strip/true/crop/1813x2048+0+0/resize/840x949!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb5%2F3c%2F1471f89401f7b06078e8b7392e3c%2Fla-esp-canelogolvokin-001"
        
      },
      {
        "id": 1,
        "name": "Vasyl Lomachenko",
        "country": "Ukraine",
        "age": 32,
        "record": "14-2-0",
        "lastOponents": ["Teofimo Lopez", "Luke Campbell", "Jose Pedraza", "Jorge Linares"],
        "image": "https://as.com/masdeporte/imagenes/2018/05/12/polideportivo/1526158347_375701_1526179834_noticia_normal.jpg"
      }
    ];
    return { boxers: boxers };
  }
}
