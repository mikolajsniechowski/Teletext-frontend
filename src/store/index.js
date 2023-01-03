import {createStore} from 'vuex'
import axios from 'axios';
import sourceDataCurrency from '@/datacurrency.json'
import sourceDataWeather from '@/dataweather.json'
import CoinpaprikaAPI from '@coinpaprika/api-nodejs-client'

export default createStore({
    state: {
        currentDate: null,
        pageState:{
            maxPage:0,
            pageNumber:1,
            startPage:1,
            contentArray: null,
            limitAtPage:3,
              
        },
        subpageState: {
            hasSubpages:false,
            subpageContent: {
                maxPage:0,
                sPageNumber:1,
                contentArray: null,
                limitAtPage:3,
                limitDigitsAtPage:600,
                title:null,      
            }
        },
        channelContents: {
            WelcomeScreen:{
            title: 'Plansza tytułowa',    
            range:  [1,1],
            content:[]      
            },
            Contents:{
            title: 'Spis treści',    
            range: [2,5],
            content:[]
            },
            CurrencyRates:{
            title: 'Kursy Walut',    
            range: [6,10],
            content:[['Spis treści', false,0,'CurrencyRatesContents'],
            ['Średni kurs', true,3,'currencies'],
            ['Kupno i Sprzedaż - Tabela C', true,3,'currenciesBuySell'],
            ['Aktualny Kurs Złota', false,10,'goldPrice'],
            ['Cena innych metali szlachetnych', false,10,'metals']],
            currencies: [''],
            currenciesBuySell:[''],
            goldPrice:[],
            metals: [],
            CurrencyRatesContents:[]
            },
            CryptoRates: {
            title: 'Kursy Kryptowalut',    
            range: [11,12], 
            content:[['Bitcoin Informacje', false,10,'bitcoinInfo'],['Parametry całego rynku kryptowalut', false,10,'globalInfo']],
            bitcoinInfo:[''],
            globalInfo:[''],
            CryptoRatesContents:[], //FEJK
            },
            News: {
            title:'Wiadomości',    
            range: [13,20],
            content:[['Spis treści', false,0,'NewsContents'],
            ['Wiadomości ogólne', true,3,'topNews'],
            ['Wiadomości technologiczne',true,3,'technologyNews'],
            ['Wiadomości sportowe', true,3,'sportsNews'],
            ['Wiadomości rozrywkowe',true,3,'entertainmentNews'],
            ['Wiadomości biznesowe', true,3,'businessNews'],
            ['Wiadomości naukowe', true,3,'scienceNews'],
            ['Wiadomości o zdrowiu', true,3,'healthNews']],
            topNews:[],
            technologyNews:[],
            sportsNews:[],
            entertainmentNews:[],
            businessNews:[],
            scienceNews:[],
            healthNews:[],
            NewsContents:[]    
            }, 
            Weather: {
            title:'Pogoda',    
            range:[21,37],
            content:[['Spis treści', false,0,'WeatherContents'],
            ['Wojewódzctwo dolnośląskie', true,2,'lowersilesian'],
            ['Wojewódzctwo kujawsko-pomorskie', true,2,'kuyavianPomeranian'],
            ['Wojewódzctwo lubelskie', true,2,'lublin'],
            ['Wojewódzctwo lubuskie', true,2,'lubusz'],
            ['Wojewódzctwo mazowieckie', true,2,'masovian'],
            ['Wojewódzctwo małopolskie', true,2,'lesserPoland'],
            ['Wojewódzctwo opolskie', true,2,'opole'],
            ['Wojewódzctwo podkarpackie', true,2,'subcarpatian'],
            ['Wojewódzctwo podlaskie', true,2,'podlaskie'],
            ['Wojewódzctwo pomorskie', true,2,'pomeranian'],
            ['Wojewódzctwo śląskie', true,2,'silesian'],
            ['Wojewódzctwo świętokrzyskie', true,2,'holycross'],
            ['Wojewódzctwo warmińsko-mazurskie', true,2,'warmianMasurian'],
            ['Wojewódzctwo wielkopolskie', true,2,'greaterPoland'],
            ['Wojewódzctwo zachodniopomorskie', true,2,'westPomeranian'],
            ['Wojewódzctwo łódzkie', true,2,'lodz'],
            ],
            WeatherContents:[],
            cities:[],
            lowersilesian:[],
            kuyavianPomeranian:[],
            lublin:[],
            lubusz:[],
            lodz:[],
            lesserPoland:[],
            masovian:[],
            opole:[],
            subcarpatian:[],
            podlaskie:[],
            pomeranian:[],
            silesian:[],
            holycross:[],
            warmianMasurian:[],
            greaterPoland:[],
            westPomeranian:[]
            },
            Program: {
            title: 'Program Tv',
            range:[38,45],
            content:[['Spis treści', false,0,'ProgramContents'],
            ['TVP 1', true,1,'tvp1'],
            ['TVP 2', true,1,'tvp2'],
            ['Polsat', true,1,'polsat'],
            ['TVN', true,1,'tvn'],
            ['TVN 7', true,1,'tvn7'],
            ['TV 4', true,1,'tv4'],
            ['TV Puls',true,1,'tvpuls'],
            ['Puls 2',true,1,'puls2']
            ],
            ProgramContents:[''],
            tvp1:[''],
            tvp2:[''],
            polsat:[''],
            tvn:[''],
            tvn7:[''],
            tv4:[''],
            tvpuls:[''],
            puls:[''],
            },
            //DO ZROBIENIA
            Surveys:{
            title: 'Ankiety',
            range:[46,48],
            content:[['Spis treści',false,2,'SurveysContents'],['Ankieta miesiąca',true,3,'SurveysMonthly'],
            ['Ankieta tygodniowa',true,3,'SurveysWeekly'],
            ],
            SurveysContents:['zzzz'],
            SurveysMonthly:['ccc'],
            SurveysWeekly:['bbb'],     
            },
            Announcements: {
            title: 'Ogłoszenia',    
            range: [49,55],
            content:[['Spis treści',false,10,'AnnouncementsContents'],
                ['Ogłoszenia drobne',true,3,'SmallAnnouncements'],
                ['Reklamy',true,3,'Advertisements'],
                ['Ogłoszenia motoryzacyjne',true,3,'CarAnnouncements'],
                ['Praca',true,3,'WorkAnnouncemetns'],
                ['Nekrologi',true,3,'Necrology'],
                ['Anonse towarzyskie',true,3,'Acquaintances'],
            ],
            AnnouncementsContents:[],
            SmallAnnouncements:['zzz'],
            Advertisements:['fff'],
            CarAnnouncements:['xyz'],
            WorkAnnouncemetns:['pa'],
            Necrology:['aaa'],
            Acquaintances:['zyz']
            }
        }
    },
    mutations: {
        getNow () {
            const today = new Date();
            let month = '' + (today.getMonth() + 1);
            let day = '' + today.getDate();
            if(month.length < 2)
            {
              month = '0'+month
            }
            if(day.length < 2)
            {
              day = '0'+day
            }
            const date = today.getFullYear()+'-'+month+'-'+day;
            const dateTime = date 
            this.state.currentDate = dateTime;      
          },
        setWeatherArrays(state){
         let cities = state.channelContents.Weather.cities
         cities.forEach( element => {
          let region = element.region
          //console.log(region)
          if(state.channelContents.Weather[region])
          {
            state.channelContents.Weather[region].push(element)
          }
         })
        },  
        setPageParameters(state,payload){
            state.pageState.contentArray = payload.key1
            state.pageState.limitAtPage = payload.key2
            state.pageState.startPage = payload.key3
            state.pageState.maxPage = Math.ceil(state.pageState.contentArray.length/state.pageState.limitAtPage)
        },  
        setSubpageParameters(state,payload) {
            state.subpageState.subpageContent.contentArray = payload.key1
            state.subpageState.subpageContent.limitAtPage = payload.key2
            state.subpageState.subpageContent.title = payload.key3
            state.subpageState.hasSubpages = payload.key4
            if(payload.key2!=0)
            {   
                if(Array.isArray(payload.key1))
                {
                  state.subpageState.subpageContent.maxPage = Math.ceil(state.subpageState.subpageContent.contentArray.length/state.subpageState.subpageContent.limitAtPage)
                }
                else
                {
                  state.subpageState.subpageContent.maxPage = Math.ceil(Object.keys(state.subpageState.subpageContent.contentArray).length/state.subpageState.subpageContent.limitAtPage)
                }
            }
            else
            {
                state.subpageState.subpageContent.maxPage = 1
            }
            
        },
        setPageNumber(state,value)
        {
            state.pageState.pageNumber = value
        },
        setSPageNumber(state,value)
        {
            if(value)
            {
              state.subpageState.subpageContent.sPageNumber = value
            }
            else
            {
              state.subpageState.subpageContent.sPageNumber = 1
            }
            
        },
        setHasSubpage(state,value)
        {
            state.subpageState.hasSubpages = value
        },
        resetSubpage(state)
        {
            state.subpageState.subpageContent.sPageNumber = 1
        },
        setNewsCategoryArray(state,payload)
        {
            state.channelContents.News[payload.key1] = payload.key2 ;
        },
        setBitcoinInfo(state,payload)
        {
          state.channelContents.CryptoRates.bitcoinInfo = payload;
        },
        setGlobalInfo(state,payload)
        {
          state.channelContents.CryptoRates.globalInfo = payload;
        },
        setChannelsContents()
        {   

            let allchannels = this.state.channelContents;
            let x = 0
            Object.keys(allchannels).forEach(element1 => {
                let content = allchannels[element1].content;
                let arrayContent = []
                content.forEach( element2 => {
                    if(content.indexOf(element2))
                    {
                        let ind = content.indexOf(element2)+allchannels[element1].range[0]
                        let arr = [element2[0],ind]
                        arrayContent.push(arr)
                    } 
                    })
                    if(x>1)
                    {
                        let str = element1+'Contents'
                        allchannels[element1][str] = arrayContent
                    }
                    x++
            })
        },
        //----------------------CHANNEL CONTENTS 
        
        getCurrenciesData(state) {
        state.channelContents.CurrencyRates.currencies= sourceDataCurrency.currencies;
        },
        getWeatherData(state){
          state.channelContents.Weather.cities = sourceDataWeather.cities;
        }
    },
    actions: {
        subpageContentLoader(state){
        
          let page = this.state.pageState.pageNumber
        let allchannels = this.state.channelContents;
        Object.keys(allchannels).forEach(element => {
             if(page >= allchannels[element].range[0] && page <= allchannels[element].range[1])
            {   
                let index = page - allchannels[element].range[0];
                if(allchannels[element].content[index])
                {
                this.state.subpageState.hasSubpages = allchannels[element].content[index][1];
                let contentAr = allchannels[element].content[index][3]
                    if(contentAr)
                    {
                        let payload = {'key1': allchannels[element][contentAr],'key2':allchannels[element].content[index][2], 'key3':allchannels[element].content[index][0],'key4':allchannels[element].content[index][1]}
                        state.commit('setSubpageParameters',payload);
                    }
                }
                    
            }
        })    
        },
        //Currency Actions
        async getCurrenciesRate() {
            this.state.channelContents.CurrencyRates.currencies.forEach( async (element) =>  {
                try {
                    const response = await axios.get('https://api.nbp.pl/api/exchangerates/rates/a/'+element.code+'/?format=json');
                    const mid=response.data.rates[0].mid;
                    element.rate = mid
                  } catch (error) {
                    console.log(error);
                    element.rate = 'BRAK DANYCH'  
                  }
            });
        },
        async getCurrenciesRateBuySell(){
            try {
                const response = await axios.get('https://api.nbp.pl/api/exchangerates/tables/c/?format=json');
                this.state.channelContents.CurrencyRates.currenciesBuySell = response.data[0].rates
              } catch (error) {
                console.log(error)
              }         
        },
        async getGoldPrices(){
            try {
                const response = await axios.get('http://api.nbp.pl/api/cenyzlota/last/30/?format=json');
                this.state.channelContents.CurrencyRates.goldPrice = response.data
              } catch (error) {
                console.log(error)
              }      
        },
        async getMetalPrices(){
            try {
                const response = await axios.get('https://metals-api.com/api/latest?access_key='+process.env.VUE_APP_API_KEY_METAL+'&base=USD&symbols=XAG%2CXPD%2CXPT%2CXRH%2CALU%2CNI%2CZNC%2CTIN%2CLCO%2CIRD%2C+LEAD%2C+IRON%2CURANIUM%2CBRONZE%2CMG%2COSMIUM%2CLITHIUM%09%09');
                //console.log(response)
                this.state.channelContents.CurrencyRates.metals = Object.entries(response.data.rates)

              } catch (error) {
                console.log(error)
              }      
        },

        //Cryptocurrencies actions
        async getGlobalInfo(state){
          const client = new CoinpaprikaAPI()
          client.getGlobal().then(response => { state.commit('setGlobalInfo', response)}).catch(console.error)
        },
        async getBitcoinInfo(state){
          const client = new CoinpaprikaAPI()
              client.getCoinsOHLCVHistorical({
              coinId: "btc-bitcoin",
              quote: "usd",
              start: this.state.currentDate,
              end: this.state.currentDate 
          }).then(response => { state.commit('setBitcoinInfo',response[0]), console.log(response)}).catch(console.error)
                  },
        //News Actions------------------------------------------------------------------------
        getArticle(state, element)
        {
            let art = [];  
            let str;   
                if(element.description)
                {
                    str= element.description
                }
                else 
                {
                    str = element.content
                }
                    art.push(element.title,str)
            return art   
        },
        getNews(state,category) {
            const axios = require('axios');
            let arts=[]
            let url = 'https://newsdata.io/api/1/news?apikey='+process.env.VUE_APP_API_KEY_NEWS+'&language=pl&category='+category;
            axios.get(url).then(  function(r1) {
              let results = []
              for(let i=0;i<5;i++)
              {
                let str = r1.data.results[i+2];
                results.push(str);
              }
              results.forEach( element =>
                 {
                let art = state.dispatch('getArticle',element);
                arts.push(art);
               
                if(arts.length==results.length)
                {
                  let arts2 = []
                  Promise.all(arts).then( value => { arts2.push(value)})
                    const payload = {key1: category+'News',key2:arts2};
                          state.commit('setNewsCategoryArray',payload);
                }
              })
            })
            
        },
        //Weather Actions
        async getWeatherParams() {
          this.state.channelContents.Weather.cities.forEach( async (element) =>  {
              try {
                  const response = await axios.get('https://api.weatherapi.com/v1/forecast.json?key='+process.env.VUE_APP_API_KEY_WEATHER+'&q='+element.slug+'&hour=12&lang=pl&days=3');
                  let days = response.data.forecast.forecastday
                  //console.log(days)
                  let cityparams = []
                  let i=0
                  let daynames = ['dziś','jutro','pojutrze']
                  days.forEach( day => {
                  let dayparams = {}
                  dayparams.dayname = daynames[i]
                  dayparams.mintemp = day.day.mintemp_c
                  dayparams.maxtemp = day.day.maxtemp_c
                  dayparams.avgtemp = day.day.avgtemp_c
                  dayparams.maxwind = day.day.maxwind_kph
                  dayparams.chances = String(day.day.daily_chance_of_rain)+'%/'+String(day.day.daily_chance_of_snow)+"%"
                  dayparams.conditions = day.day.condition.text
                  cityparams.push(dayparams) 
                  i++
                })
                  //console.log(cityparams)
                  element.params = cityparams
                } catch (error) {
                  console.log(error);
                  element.rate = 'BRAK DANYCH'  
                }
          });
      },
    },
    getters: {
       
        Pagination(state)
        {
            if(state.pageState.pageNumber == state.pageState.startPage)
          {
            return state.pageState.contentArray.slice(0,state.pageState.limitAtPage)
          }
          else if(state.pageState.pageNumber == state.pageState.startPage+1)
          {
            return state.pageState.contentArray.slice(state.pageState.limitAtPage,state.pageState.limitAtPage*2)     
          } 
          else
          {
            const  x= state.pageState.pageNumber - state.pageState.startPage
            const begin = (1+x)*state.pageState.limitAtPage-state.pageState.limitAtPage
            var end = Number
            if(state.pageState.pageNumber == state.pageState.maxPage)
            {
                end = state.pageState.contentArray.length
            }
            else{
                end = begin + state.pageState.limitAtPage 
            }     
            return state.pageState.contentArray.slice(begin,end)
          }
          
        },
        SubPagination(state)
        {
          if(state.subpageState.subpageContent.limitAtPage > 0)
          {
            if(state.subpageState.subpageContent.sPageNumber == 1)
          {
            return state.subpageState.subpageContent.contentArray.slice(0,state.subpageState.subpageContent.limitAtPage)
          }
          else if(state.subpageState.subpageContent.sPageNumber == 2)
          {
            return state.subpageState.subpageContent.contentArray.slice(state.subpageState.subpageContent.limitAtPage,state.subpageState.subpageContent.limitAtPage*2)     
          } 
          else
          {
            const begin = state.subpageState.subpageContent.sPageNumber*state.subpageState.subpageContent.limitAtPage-state.subpageState.subpageContent.limitAtPage
            const end = begin + state.subpageState.subpageContent.limitAtPage   
            return state.subpageState.subpageContent.contentArray.slice(begin,end)
          }
          }
          else
          {
            return state.subpageState.subpageContent.contentArray
          }  
          
          
        },
        SubPaginationText(state)
        {
          let textarr = state.subpageState.subpageContent.contentArray[0];
          let text = "";
          textarr.forEach( element => {
              text+="⚪"
              text+=element[0];
              text+="\n\n";
              text+=element[1];
              text+="\n\n\n";
          });
          let begin;
          let end;
            if(state.subpageState.subpageContent.sPageNumber == 1)
          {
           let text2 = text.slice(0,state.subpageState.subpageContent.limitDigitsAtPage);
           end = text2.lastIndexOf(" ");
            return text2.slice(0,end);
          }
          else if(state.subpageState.subpageContent.sPageNumber == 2)
          {
            begin = text.slice(0,state.subpageState.subpageContent.limitDigitsAtPage).lastIndexOf(" ");
            let x = text.slice(0,state.subpageState.subpageContent.limitDigitsAtPage+begin);
            end = x.lastIndexOf(" ");
            return text.slice(begin,end);
          } 
          else
          {
            let spage = state.subpageState.subpageContent.sPageNumber
            let limit = state.subpageState.subpageContent.limitDigitsAtPage
            let z
            let x
               z = text.slice(0,limit*(spage-1));
              begin = z.lastIndexOf(" ");
              x = text.slice(0,(limit*(spage-1)+limit));
            end = x.lastIndexOf(" ");
            
            
            return text.slice(begin,end);
          }
        },
        getContents(state) //Returns Contents from ChannelContents
        {
            const AllContents = []
            Object.keys(state.channelContents).forEach(key => {
                const arrayContent = []
                if( state.channelContents[key].content)
                {
                    state.channelContents[key].content.forEach( element => { arrayContent.push(element[0],state.channelContents[key].content.indexOf(element)+state.channelContents[key].range[0])
                 }  
                    )
                }
                AllContents.push([state.channelContents[key].title,arrayContent,state.channelContents[key].range[0],]);
            });
            return AllContents
        }
    },
    modules: {

    }
})