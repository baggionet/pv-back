import models from '../models';
import { isEmpty } from '../utils/methods';
import { encriptPassword } from '../utils/password';
import { fileUpload } from '../utils/uploadImages';
import Sequelize from 'sequelize';
import bcrypt from "bcryptjs";


/*
** Se creara usuario nuevo.
*/
const userAdd = async (req, res) => {
  try {
    const { body } = req;
    let userPhoto = null;
    let bcryptPassword = null; 
    const imageDefaul = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkJCggKCAsLCQsKCwsLDhAMCgsNExcVEBQPFhISDhYSDxQPDxQSFBgTFhQZIBoeGRgrIRwkExwdMiIzKjclIjABBgsKCw0OCwwMDg4MDRAOHRQNDCIUFRcOHggXDBAWEBEXCxATFAsRGREeCRkMCCIYHRQPHRANDA8WEAsUFSMWGP/CABEIAWMBZAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAgMEB//aAAgBAQAAAAD7iAAMc/L59OOdu+0hvkAAAADxR0fpkAx7JOQ2AAAAxGQ/MAAYkpzcAAAR8HzAAAYk53IAAMV+PyAAAG9k9IAA5VzzgAAAMTkqAA5VfQAAAAYmZgAHOraAAAAATMuAMVfgAAzgzgADFi94BXvAABpDxnm029MlMdQAZtuwEfXsgBrXoLUBN2PoAHqsuQVTkAHKn+IAPTcfQAFh94RMKAM8qX5QAO907gDpa8ip8wAqUUAAe+5ZAFi9x4q4AEfTMgAC1y4A9FoIGNAGahGYAAHsu+ADFv2xUtQDGlE0AADW/dgBPyKnZAHipQAAFvkwBIz/AIq3kAzF0/IAALRNADe2xEMAEbTwAALRNADFwg4wAPHSMgAAt8mAMXGuxfXIBpROYAAYv3UAcrpXonO/QBmoxQAAe+6YAY5aXiChTbpsB4aVkAAW6UAc+bF2ja4G/TIZqsMAAzJW8DTkMXjw1YDPXYa03wgAeq6dBjTTAb3XFHyAb75zpUY3IA9tv7MaaYASNnUzkADbO0RXOQG9hm8Y1wAE7Nq9EAA5xsb4eeAHX2yMl2ADFz7PNT8gHngorAAAkrB6QDtcjFO4gawUJjOAAATFg3An5kRtZBxq3jAAAD02n0hm7ZGKbyHCocgAAAOlr9gmp4HgquXGocQAAADe3+lvdMgVmNxUfGAAAAHouG1pkAGKdW4IAAAACXvdhAGnxTkAAAABZvpoAIn5NzAAAACx/T8gAR/ybygAAAMW/wCigADj8wgMgAABv9HtIAAMVX55yAAAYsX0f1gAAGtJpXEAAa2O8TQAAAGKxVa/rkA1kLRcvWAAAADEZCxfh8+vX0yUvL+wAAAAAAAAAB//xAAaAQEAAgMBAAAAAAAAAAAAAAAABAUBAgMG/9oACAECEAAAAAEmZI6NOESJgAEy27gNKuuwAzcWAAI9FzBm9lgAOVByC6ngzI348Mhw89gmXoYsZ+TlU8cisqT0XcYs52cGdaTmMeb5yfQB0vcARqfIqay1tBiwsQDz4RvP3swYs5wDNDoMeX9H2GLCxAPPg8x6SRzwdL3AMxagbdPJX1g001WU8GtHq232x4+4uRjnrOscnCq023yRfMyvTDG0yT0ya8YsTOSnp3p5LE2eAOVbyy8rxT/Q4spQAMVXGtohf3s8ABrReW0G3uLEABx8NDBv7C4ABC8ZEALr00sBy8753UAFpbT5GeMGrp9QAAwyAH//xAAaAQEAAwEBAQAAAAAAAAAAAAAAAwQFAgEG/9oACAEDEAAAAAEMEXDqSef0AFelGA6t2/QHlCsACXR7B5mwgAOtTsM+sDmLzuUHer6V84PK1Yd3JAt3jKjCpXB7e79Gt3DmBHQATXQu3KVMK1UA0vRLqZsAVK4Bodhs5Mfp5XqgGl6PNjKi69OM8BNdHPO3m1nvXqrWB7f7c8m7Qoh71WrDu3J5z56l2IMkOYIuR73NMF6+x4itB56A6tSGzIrZapEABc7uaQy86t6AA0tnoefO1QAHf0VgHOFRABPvzgGfkQgO9TV9ABSpVondi7e6AAAAB//EAC0QAAIBAgUCBQMFAQAAAAAAAAECAxEwABIhMUAEMhATICJBFEJQIzNRUnFD/9oACAEBAAEIAuDnQY81Meb/AB5z48x8ea+PNfHnNjzRjzUxUfgPMUbGV/jU72w7jAm/kMp25Rl/qSTvwVkcYV1PHaQDYknfirIw3BBGnC2wzk7cgEg1CSA6cFmAGrMWOvLST4e8zBRgkk1PNjkpo1xiAME1NTz4np7TaJoMMxY1/BRvX2mzI1TQXSQNzMPgyvjPJjM+M74818CYfIKna6jZhYkagpd23eX+u+9hJf7Ag7W0bK1gnMa3GIUau7NcVmXZWDC5C2mX1Sn4uEgCuHYsbysVNcKQy1tg0NfUTU1uSvmNBfjbK1yE6EeiXRbkjZV4ULVFLamjD0Smr3JjV+EhytcQ5l8dzbOxwdzw1NVFuA7jwkNENyT9s8SHstxGj+Ex9tybs4kHbbGhHhN8XJuziQdt2bvFyTsPEi/buL2jE3fcOxwe48MCguR9gxN33ZhRq8KMZnux9gxOPcLsi5l4US5Vur2jHUfbelSmovxLmN+Ufp3txTDplN5VzHAFBS6O4eDaqb5AIoXjK3FRmwAFGl2IVkHidGN/TDQ11Ugrv6wCdlh+W0GK3oRufGYUet0lRgyjBlf4qxtVYYErjAlGAym7GMqDxlWqW2ZV3aUnb/b/APgkYYV1bayozMB6WFGIsvL8LxUlI0bQ7euBdz6Z10zetiF3Zy3IViuFYN61FAB6iMpp6WYKK4JLankgkahGDD0wr93rmWoqPFiFGCamvM2NcKwYeIFTTAFBYlTKfF2zHnK2VsA1FfCJcoqbDAEULAq1DK32/gImppiNK+42nTMuGDBirc/poDKczXJ4VlGCGVsrc2CDzPc2212aFJF1dHjaj8uDpy3vl4EiI65WmgeLXkgMxosPTBPdJw5ukU6xMGQ0fixdPJJqUjjjFE4rqrCjSdGd4mVkNH4MfTTPiOCKPbklVYUMnRx/Y3TTrg1G9tY5X7V6M/8ARIoo+3nEA7t0sBweiX7T0cvx9L1GPp+px5HUY+m6nH0k+B0TfcOjh+RFEvb+e//EACoRAAIBAgYCAQMFAQAAAAAAAAECAwQgABAREiEwMTIFExRBIiMzQEJS/9oACAECAQEIAL1gkbApP+hTRDH0YsfRiwaeI4NIv4amkHggjg9kdOz8lIkTx0Mitw0lKRynSATwIqcLy/ZJCr4dGQ6NcATwIYQg1Pc6K40LoUOhtgh2je1yqzeop5Pz9s+DDIL5Iw66YIIJBzgj3tqbo6f8vwOBm0asDrJGyebamP8A2M4k2IBacQxaDebiAQQZEKMVtIBBBddrFcoV3Ot0a7nUdMybkuql9XypV92upx7HqI0JFs66xtlTjSMXU/q3U/u9pGoIyhX9tLqc+w6idSTc3lsQfxJgjBFiPsYHpmfatumBhvLYpTrGBmRjTOCXX9DXEhRuLuXJJy24AGROgJyo291t0GNuCpwlRpw4IPIzeVU8u7OeduNts7bY3ygfZIpuVWbwIB5IjQeLNowYUOGhYevI4NlW/qmcMm9FNiQ/lvHjpdFby6FLJH3uzZ08uxtDlFFt5PYQDh4yhyqpdF2Cynm3ja0Mf+z3EAggysIgSzMWJY2AkEEUtSky98kiRqXeoqGmfcbldkIZaauSXRX7J6mOEavNO8zbn6YK+SPRXiqIpfToeRIxq83yR5WEsWJLdkdfUJxhPlEPutdTHAqID4+4gwaymHl/k4R6yfIztwrMzHVv73//xAAnEQACAQMDBAIDAQEAAAAAAAABAgMAESAQMDEEEhNBITIiQlFAUv/aAAgBAwEBCADMyIKM/wDDK9eR68j15XoTn2JlO80oHDOzc7AYjhZvTbTyk/C7iuVpWDC4zdy2+rFTcKwYXGMj3NhkSPflWvKKDqc1Yqb0Df5wkewzaT0uCsRSuGyif9Tq7dxJyd7/AAMhSt3C+StcA6SGynJjYGv5sI1mGUJ5XSY/UZS+htD1jGbMNJT+Ryk5G0vC4jRz+bZSjg7QFhkOBUn3bJhcEbKLc3xvoOBUw/PW+EiexkBewCrYa3xnH1OV6uKaP2pBGCqxpVC1er4xi7rpIt1ORYDkyfwsTjc0HYUJAecYF5bV17WIwaT/AJ2gxFKwOCL2qBrKlxcaO1+N1G7tIUue44Sx9puHb0N4Eg3CDvtZVCgAYEA/BlhMZ31RnIVYohGLDJlDAgy9OyfK7kcTyH4jiWMWGzJ0qtcq8Tp9thUZjZY+k9yAACw3G6aJqbo2/U9PMK8UleOShBKaHSSHlekjHIAAsP8Ad//EAC0QAAEBBgUCBQUBAAAAAAAAAAEAAjAxQEFQESFRcYEikRASIDJgUmGhsdGC/9oACAEBAAk/ApErEoLDxwQCFizWT0oIzfdGSzXaXzl8xK5CayMl2nO9uhS3Qo84sUaOoCRJTRRMjy4ibLzKw0maX+EhAvKeitto8pbdfhdfjmlt0e62DT4zpPwf6v4PoWCDyD+mdwq9IkCJCmbzJGQKzvGw9NHEJiGl049dLdA+MLDE2zh3GhWRFg9g/L3JsQKGBE97P2/yIg0htOe2jOu8iMV1Ma/2ZGJ0XU1QUEp0n6aIYGW6GdaobmWAKP8AkoEGS6B90MTqZoYhEs/aiHm2QI3eMHdNcBM81nximcNk2RummSgO6Y/X9TBTH5C8oTY4CLRTI3v/AP/EACoQAAECBAQGAwEBAQAAAAAAAAEAESEwMUFAUWFxECCBkbHBodHw4VDx/9oACAEBAAE/IcCagNgiCgRD7Ucgf262lqhASC4oXTQPcjdAlCDtj4CqOeURYpNQTMo5nQq11wqSYokAOSwQqD1I+5jgqrDqh8IHNXDwiN8I25vhoL7yfxPgyQDmAUN9w4lxLFCXN5dsC5ugJ/UWxiMCbfae8D0GPEfJjKa6j0RDXP8AAdAupLAQmACcalk+PCGYUFFRnGByCrSV/wBIjOBxoe0oukNH41DKgO5KtoCGxTYggiBFEJ2/lIgD+E0kA5ABW6USScjIoXBKIC1CAuYImRKxhziQA5oEcp38S9E7GHRFYlH4LeRst+qOxwuFCTA5LeW44dG3NBA3idpd0QFkU67WnMFsUEB1lmGNkCCHF+V7zU2mZSGOA34WucuOdm3IUG8ImbyWKFMBZRNUS3tah5IdYJd1BLOHzgttZGstoPQ78SXDmXlkxsgjfXIjBGjXTgl+Q4dBt6mG2wcITy7ToI98IQZmZ7UKYOvLJ1keEBHczParYOvMBcAo5gB9s4QWDr5llG+2FTR5YODMIWHqwRTSJZK+GhYNfY8QZW+onvgtsAMt+Hw0xs8jp5EDvBaYGOXMZL8SoR6EEC3HM6fmoU/ZgvGa/POi5EH9WmXO/MIABVmQH1JflIBCoQyNr1XaZTZHbGooQxoFpyvzi4MyBwFnmDLdPw8K0iyJOIzB2jI3OorxxdPMgCxyJmuU6coGO6E/sWR5mc+6IsjXhCtCCKOozPFcWywfkTQse4h6OdkRUw1CNYZQpCFUC42R1XG6ofcm6yMW4iI1ZdqjJUL0FEk1DgIioFXO4rUWS/NJ1RPL8MbSCwqV9gVE1OEpc9FcAaIEEUhx38V5XgHQducO/Qq30Yg/BAdxW45gCSAKmAQBlg3KQCCDQ1RynbleRFnS1gvwxGyIumFQgrO/K45bffnza8eQoJ6BHfdMYCWFU+hA5cSDC/hAABQSCPjS0OXAsA5sjwzBTHGAbGqAAL8PyUJJFQKKLVDmFbaEn/AfPoaFPGYW+5cOp85AddRH+BQJ8z6mwzAfzO6OiqoH1jjHFA99miAAAAwEABO20VXrmoAxusRpiyWTKBuq+hAABhACAGAJmCxuDmFB2xqMTETj0BM7P5DPCEXh3T6Ttmt6zwrruiqtgoTHcO5wzG7kUJ+XoVuQr1gXURI1a+gUU6nnpYYpoLIKJiZ6vlH5VPAc/qYoCsZyBvMtwq9RoYdzBVrX7qVRoHPHuOPBMIMiszczb+LxmP8ASC+qRDf2+yIr+6P3D7QJ+HlAte5/FZrqewhvNt4VL57u5j/v/wD/xAAqEAEAAQMCBQQDAAMBAAAAAAABEQAhMUFRMEBhcYEgkaGxEMHRUOHw8f/aAAgBAQABPxDkFAlsVsX6j5ioQ3SwHy1JSK7r+FIx4j+6aIk7UCR8NaE+4/2tUOylfeoj/KzXRj+KVh+6h+ufUJQBlaPy6Nj3aASA7Xfdp6e7tQcIsyKO5WIjunzejAhdX9NXpDth9m/NPhBlaMM/f9JUmTs4Oxg5HCIomEqBGDpl4f7UUW//AMB5eTi6OHdqV96Gh2OVioiQdHD+9moghruOyacm9UDK1Izar/xBQBzBRBez3K2MOHHUuRkRBgMrsVJmBiwf15wm8MPh6cflStjytOll0NA2OdQaeCTgvwenFV4ywMrsVmowNA2P8At4ln0dnpw2zhS0wsi2ycWY0Sr1G1jekNwqakaEajY/hI5JrwnDSatmBd1/s4Qzlz/b404t3FTCHvQED3z9VKyToMKUyHn8AYy+azHQLSLebX9VOs+w7DrSJm7xBU1UoosQDYbf7acBp2LJ01NBHBzmh2rvio4Duw/NLL0kp0MI1eEPXzTdnSu3p1nShYEe9HtbkL+VaEMGSRfiu2KclaycFwvxPTc6lCIJcbj6mSQCrWa1WNsA4fRStUIhsLcKZEE7WaLrA1EBGDCs06aeq+NKsdVJ5fShTBnZvaMo1LGLM52vWLcMjX1292ePVFmv5x5frh5G9W34Q7hNIkocBemReK3osqjAKxEjo9KyiRIrU6knCy+uU3NSiSSAR6ehQFWAutIlq8NBw8sY61JeJHSG5VtOO5DhT0Acr3oZAXBI8MVkFT3v4/fofSJB0yvEtwo4Ja017mV5BurXcdKl2VrTsBwzRy9pt6IQaI7t3hNBPZXc4eFWryG1PLqfvXyUcFJKlfQA6LM/hQJadPLcJkrv+Uj3PaU1h5BzUyDJnxXW1funC8Kw7hB+JBqweaHDsHWo3135LrrTjN4n7eHAnCH/ADt+EQ4H4HiKH1KYOTwtj9tbcJxci/P494nwcPSaE9pQw5MXdz9taduE77UQmEEqyLMXbZcUX4WtIPao22tyTTTcv7KeFhUg3+qiAGg+2hFCPBa7HBTRMQAeeSxAztWh8LbzRrwcVbavzttNLZQfg/GK3KzjgFQZwVOqqRGTkAWOlZYkDzbengqFKacVZ29E41YvZ/3+D8CKC54E4Jg/bpRMq5BUgKRFlhnCG/AUKa5zWKwqxAIkjtQhTVPUKgeoUNZrUpQcAESuZqzr1Uz2ofWvCax1HWrbyGtLczl7XHULOlOhIAB4t6lCk1K+h23o9EAp1xfiL/twBaK5qPxixluVnO3uIp1rgSVi3QKNBh70uhg4WM4afco9bEK9wcCa1hxIXXK0bu52/NqUKay+pC8ieU/HTFHeLUY4MtEaA0dG+jV9DspeIqLtLjTYXPY3ndoTSxqcK2r4okC11JMSa1bWahqal68dlX1zp2qQpO1KavwH2wV9fb+dvRHabcS+7QGaJsa0TDJZBJTCUQnEwDamIhNu8VBor6sXpE0XrTsW+kCfVEAcDEEe8UGEKm4qaX4drdQva7+Y4/8AAfUcSJwPekiZNETvq1Yh4b+6tvQAp6TXsVLrdq7l9V6l0s01MrW1WDcAFLQQ7D90AX+0J+Go4biml4Z9Te/iPz0qztrPij19qxmoXFqBldMXPcGnEQTZSk5a2aiNI43gaFZR6UfBamaeB7GQpEbt6Z6VCZ9bDdbtl+PQgiNxslNpoz1q4+voUjkiN2lfdQ7lkaVryub1GhT1jxVtJ88a2s0dPmmelXRAJhVIkGiiWxqrRxB810a6eo4/CJ8+koC8Prvhfn1YqW4LMHeJphFDxbczZAeYuDOqBuKyi0WUjejPi1Xrrp+bjagdW1YCC7nV8vpPuQQVn9dnc0fRLikeXQSelToNwpJ0WrubG3mNN2vajYmUyG2BJqNmCBA1gWZq5atIfyCDj/d6zOalfrrDtp5oZPxi/wAUrZKLrqaE1axaYags3rWa78x2zTDfWjCgCJaA2GVaTmMFZv8AH4z7q7tqfFF3AwcCF0KvyP4/CRiC0hUyx6hz02WQDpE1gSA0sU7jA41Mo/vBHufg6lZcbtDQSo/9IXEkaALHOtIYa3XOwBqrThYbpq7uhpwxUsF9jq6OtPzYn9xNxMc/Nr0YNX7Wh0a0AAAAWA4kVj/xXpRRTx95YR0TnVAlo+a+MLt9jR1Dg0AGgHGLkOmzpsOpV7TuN98zmwEtGM53t1NR96JCAAEAFgAwHIB37JuHIlPMmkHstO9CJJzGFrpl7uwarW7b5W/c5NBIbjmmatdWbpF6uA3TBN0WHblUGaj5c0NjrondqMbCe778sS8fRmOpqPUqUkmVfj+9bVyDnqsJ2eRRIZWwGV6UeHbvT3/em5mlGDuYPCT15pC7ZMT5KDdLv6lV40+t/JlEpqwoU9gNScJCrvoZfRaRQ/mvkoPBRPWlw+QO3P8ATYiJ7NTeRqPYfzTZdoB+rX5tZX01jOxP4rIJ2b6p/wCzTsDvRxEt3+aMbPsn2oZnpKB8Rpmztk+En+ff/8QANREAAQEEBgcHBAMBAAAAAAAAAQACIDFBESEwUYHBAxAyYXGRoUBScpLR4fASYqKxIiNCsv/aAAgBAgEJPwB8Ubz6RTSBOKZCZCFGJTRCH1fLlUbX+LPXkhXfOxAKr+2fOyrKraula1GTS+B+sqtqZy9bfA71gdz20YbmXwSqAiyhS/GR3/IqohyDP7kMy/5XYqsSL0trhfkXIxPieiYD7b3xSoSO52GSl+tUBWXoTsYiD3A5auHYJF2VeqZz9nu9Zd52Y1XZ9gvevzV2Zex4WMS/fmpE+ub8ZF+ChIbnpDVxsMGkQXCOE6VCQf4c9UDUeBeGMkUA6ByQoN/sq0KNzvE5a4wPic5WlYvcw8Mtey1/1I5HXtZWsJrZlqi1Hwe7u0OrPtNYDsGAUS7UQqGWxtMZjdbmhkcybgFUP8s3M+vefJZaECqGNJ+JO61NLUmJ+wR8LMgPkbL+xj8gOM8eYTQJ7sGuVi0GR1wEShR95jgzAY8giSTEztWvrFxr/LaTDQ3ivoaE39PEH0IWl0fmC0uj8wWkHU/oJltvoMyqNGOvmKJaN8+3/wD/xAAtEQABAQQHCAIDAAAAAAAAAAABAAIgMDERIUBBgZHwECJQUWFxscESoWKy0f/aAAgBAwEJPwB80obCU0UUAVVGrKOEE0LOHUOcWscoMrNL3YcR0dmfEWp7Du5h2eu4vfxTlaLxxYulVwsO1gqLmjtmPG2UWfNT2SH7OyPnUlOPoLQfrZMj6jik+lO89dSfFIW8z9iLK9q5Ym+mFun6yQxuzgglGn8bs0KBFHxPT+STQKZpxCYayTDWRTBRDKpa8ZIAC3//2Q==";

    if (isEmpty(body.name)) return res.status(400).send('Name is required');
    if (isEmpty(body.userName)) return res.status(400).send('Name is required');
    if (isEmpty(body.photo)) {
      userPhoto =  await fileUpload(imageDefaul, 'profiles');
      
    }else{
      userPhoto =  await fileUpload(body.photo, 'profiles');
    }

    bcryptPassword = await encriptPassword(body.password); 
  
    const userCreate = await models.User.create({
      name: body.name,
      userName: body.userName,
      photo: userPhoto,
      rollId:body.rollId, 
      password: bcryptPassword
    });

    return res.status(201).send(userCreate); 
  } catch (error) {
    console.log(error);
    res.status(500).send(error.errors[0].message);
  }
};

/*
**Se listara todos los usuarios
*/
const list = async(req, res) => {
  try {
    const usersList = await models.User.findAll();
    console.log(usersList + "la lista");
    
    return res.status(201).send(usersList);
  } catch (error) {
    res.status(500).send(error.errors[0].message);
  }
}; 

/*
**Se buscara un usuario por ID
*/

const byid = async (req, res) => {
  try {
    const pk = req.params.userId;

    const userId = await models.User.findByPk(pk);

    if (isEmpty(userId)) return res.status(204).send('Not content');

    return res.status(201).send(userId);

  } catch (error) {
    res.status(500).send(error.errors[0].message);
  }
};

/*
**Se borrara usuario
*/

const remove =async (req, res) => {
  try {
    const pk = req.params.userId;
    const delUser = await models.User.destroy({
      where: { id: pk }
    });

    if (isEmpty(delUser)) return res.status(204).send('Not content');

    return res.send('User has been delete');

  } catch (error) {
    res.status(500).send(error.errors[0].message);
  }
};

/*
**Se actualiza un usuario por ID
*/

const update = async (req, res) => {
  try {
    //const imageDefaul = "data:image/jpeg;base64,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";

    /*const Op = Sequelize.Op;
    const {
      params: {userId},
    } = req;*/
    console.log(req.params.userId + "parametro");

    const pk = req.params.userId;
    console.log(pk + "pk");

    const body = req.body;
    console.log(body);
    
    if(isEmpty(body.name)) return res.status(400).send('Name is required');

    if (isEmpty(body.photo)) {
      body.photo =  await fileUpload(imageDefaul, 'profiles');
    }else{
      body.photo =  await fileUpload(body.photo, 'profiles');
    }
    console.log(body.photo);

    const updateUser = await models.User.update(
      {
        name: body.name,
        userName: body.userName,
        photo: body.photo,
        rollId:body.rollId,
        password: body.password 
      },
      {
        where: { id: pk}
      });
        
    //if (isEmpty(updateUser)) return res.status(204).send('Not content');
    return res.send('User has been update');

  } catch (error) {
    res.status(500).send(error.errors[0].message);
  }
};


/*
**verificacion de login del usuario
*/

const login = async (req, res) => {
  try {
    const { body } = req;
    if (isEmpty(body.userName)) res.status(404).send('Email is required ');
    if (isEmpty(body.password)) res.status(404).send('Password is required ');

    const user = await models.User.findOne({
      where: {
        userName: body.userName        
      }
    });
    if (!user) {
      return res.status(401).send('User invalid');
    }
    if (!bcrypt.compareSync(body.password, user.password))
      return res.status(401).send('User invalid');    
    
    const response = {
      id: user.id,
      userName: user.userName,
      photo: user.photo,
      name: user.name            
    };
    
    return res.status(200).send({ response });
  } catch (error) {
    res.status(500).send(error.errors[0].message);
  }
};

export { userAdd, list, byid, remove, update, login };