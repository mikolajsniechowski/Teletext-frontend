import {createStore} from 'vuex'
import axios from 'axios';
import sourceDataCurrency from '@/datacurrency.json'


export default createStore({
    state: {
        currentDate: null,
        pageState:{
            maxPage:0,
            pageNumber:1,
            startPage:1,
            contentArray: null,
            limitAtPage:3,
            limitDigitsAtPage:300,   
        },
        subpageState: {
            hasSubpages:false,
            subpageContent: {
                maxPage:0,
                sPageNumber:1,
                contentArray: null,
                limitAtPage:3,     
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
            content:[['Cena bitcoin', false,0,'bitcoinPrice'],['Cena 10 najważniejszych altcoinów', false,0,'altcoinsPrices']],
            bitcoinPrice:[''],
            altcoinsPrices:[''],
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
            lowersilesian:[''],
            kuyavianPomeranian:[''],
            lublin:[''],
            lubusz:[''],
            lodz:[''],
            lesserPoland:[''],
            masovian:[''],
            opole:[''],
            subcarpatian:[''],
            podlaskie:[''],
            pomeranian:[''],
            silesian:[''],
            holycross:[''],
            warmianMasurian:[''],
            greaterPoland:[''],
            westPomeranian:['']
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
            content:[['Spis treści',false,2,'SurveysContents'],['Ankieta miesiąca',true,3],
            ['Ankieta tygodniowa',true,3],
            ],
            SurveysContents:[],     
            },
            Announcements: {
            title: 'Ogłoszenia',    
            range: [49,55],
            content:[['Spis treści',true,3,'AnnouncementsContents'],
                ['Ogłoszenia drobne',true,3],
                ['Reklamy',true,3],
                ['Ogłoszenia motoryzacyjne',true,3],
                ['Praca',true,3],
                ['Nekrologi',true,3],
                ['Anonse towarzyskie',true,3],
            ],
            AnnouncementsContents:[],  
            }
        }
    },
    mutations: {
        getNow () {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const dateTime = date 
            this.state.currentDate = dateTime;      
          },
    
        setPageParameters(state,payload){
            state.pageState.contentArray = payload.key1
            state.pageState.limitAtPage = payload.key2
            state.pageState.startPage = payload.key3
            state.pageState.maxPage = Math.ceil(state.pageState.contentArray.length/state.pageState.limitAtPage)
        },  
        setSubpageParameters(state,payload) {
          console.log(payload)
            state.subpageState.subpageContent.contentArray = payload.key1
            state.subpageState.subpageContent.limitAtPage = payload.key2
            if(payload.key2!=0)
            {   
                state.subpageState.subpageContent.maxPage = Math.ceil(state.subpageState.subpageContent.contentArray.length/state.subpageState.subpageContent.limitAtPage)
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
            console.log(payload);
            state.channelContents.News[payload.key1] = payload.key2 ;
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
        console.log(state.channelContents.CurrencyRates.currencies);
        },
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
                        let payload = {'key1': allchannels[element][contentAr],'key2':allchannels[element].content[index][2]}
                        state.commit('setSubpageParameters',payload);
                        console.log("eee")
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
                console.log(response.data[0].rates)
                this.state.channelContents.CurrencyRates.currenciesBuySell = response.data[0].rates
              } catch (error) {
                console.log(error)
              }
                  
        },
        async getGoldPrices(){
            try {
                const response = await axios.get('http://api.nbp.pl/api/cenyzlota/last/30/?format=json');
                console.log(response.data)
                this.state.channelContents.CurrencyRates.goldPrice = response.data
              } catch (error) {
                console.log(error)
              }      
        },
        //https://metals-api.com/api/latest?access_key=btoe8y52ao0dnlsy2o40a5el13gq55pg20wmvwom6x726da2y816z4vtb3xn&base=USD&symbols=XAG%2CXPD%2CXPT%2CXRH%2CALU%2CNI%2CZNC%2CTIN%2CLCO%2CIRD%2C+LEAD%2C+IRON%2CURANIUM%2CBRONZE%2CMG%2COSMIUM%2CLITHIUM%09%09
        async getMetalPrices(){
            try {
                const response = await axios.get('https://metals-api.com/api/latest?access_key=btoe8y52ao0dnlsy2o40a5el13gq55pg20wmvwom6x726da2y816z4vtb3xn&base=USD&symbols=XAG%2CXPD%2CXPT%2CXRH%2CALU%2CNI%2CZNC%2CTIN%2CLCO%2CIRD%2C+LEAD%2C+IRON%2CURANIUM%2CBRONZE%2CMG%2COSMIUM%2CLITHIUM%09%09');
                console.log(response)
                this.state.channelContents.CurrencyRates.metals = Object.entries(response.data.rates)

              } catch (error) {
                console.log(error)
              }      
        },
        //News Actions------------------------------------------------------------------------
        getArticle(state, element)
        {
            let art = [];  
            let str;      
                if(element.description == null)
                {
                    str= element.content
                }
                else 
                {
                    str = element.description
                }
                    art.push(element.title,str)                 
            return art   
        },
        getNews(state,category) {
            const axios = require('axios');
            let arts=[]
            let url = 'https://newsdata.io/api/1/news?apikey=pub_14248fa3072e0487f10e233cb311fd8a89144&language=pl&category='+category;
            axios.get(url).then(  function(r1) {
              let results = []
              for(let i=0;i<5;i++)
              {
                let str = r1.data.results[i+2];
                results.push(str);
              }
              results.forEach( element => {
                let art = state.dispatch('getArticle',element);
                arts.push(art);
                if(arts.length==results.length)
                {
                    const payload = {key1: category+'News',key2:arts};
                          state.commit('setNewsCategoryArray',payload);
                }
              })
            })
            
        }
    },
    getters: {
        getAllText(state, textarray)
        {
            let text = "";
            textarray.forEach( element => {
                element.forEach( element2 => {
                    text+=element2+"\n";
                }) 
            })
            return text;
        },
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
            console.log()     
            return state.subpageState.subpageContent.contentArray.slice(begin,end)
          }
          }
          else
          {
            return state.subpageState.subpageContent.contentArray
          }  
          
          
        },
        SubpaginationText(state)
        {
            if(state.subpageState.subpageContent.sPageNumber == 1)
          {
            return state.subpageState.subpageContent.contentArray.slice(0,state.subpageState.subpageContent.limitDigitsAtPage)
          }
          else if(state.subpageState.subpageContent.sPageNumber == 2)
          {
            return state.subpageState.subpageContent.contentArray.slice(state.subpageState.subpageContent.limitDigitsAtPage,state.subpageState.subpageContent.limitDigitsAtPage*2)     
          } 
          else
          {
            const begin = state.subpageState.subpageContent.sPageNumber*state.subpageState.subpageContent.limitDigitsAtPage-state.subpageState.subpageContent.limitDigitsAtPage
            const end = begin + state.subpageState.subpageContent.limitDigitsAtPage     
            return state.subpageState.subpageContent.contentArray.slice(begin,end)
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