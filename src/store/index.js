import { Array } from 'core-js'
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
            range:  [1,1]      
            },
            Contents:{
            title: 'Spis treści',    
            range: [2,5]
            },
            CurrencyRates:{
            title: 'Kursy Walut',    
            range: [6,10],
            content:[['Spis treści', false,0],
            ['Średni kurs', true,3],
            ['Kupno i Sprzedaż - Tabela C', true,3],
            ['Aktualny Kurs Złota', false,0],
            ['Cena innych metali szlachetnych', false,0]],
            currencies: [''],
            currenciesBuySell:['']
            },
            CryptoRates: {
            title: 'Kursy Kryptowalut',    
            range: [11,12], 
            content:[['Cena bitcoin', false],['Cena 10 najważniejszych altcoinów', false]]
            },
            News: {
            title:'Wiadomości',    
            range: [13,20],
            content:[['Spis treści', false],
            ['Wiadomości ogólne', true,3],
            ['Wiadomości ze świata',3],
            ['Wiadomości sportowe', true,3],
            ['Wiadomości biznesowe', true,3],
            ['Wiadomości motoryzacyjne', true,3],
            ['Wiadomości technologiczne', true,3],
            ['Wiadomości growe i filmowe', true,3]]
            }, 
            Weather: {
            title:'Pogoda',    
            range:[21,37],
            content:[['Spis treści', false],
            ['Wojewódzctwo dolnośląskie', true,2],
            ['Wojewódzctwo kujawsko-pomorskie', true,2],
            ['Wojewódzctwo lubelskie', true,2],
            ['Wojewódzctwo lubuskie', true,2],
            ['Wojewódzctwo mazowieckie', true,2],
            ['Wojewódzctwo małopolskie', true,2],
            ['Wojewódzctwo opolskie', true,2],
            ['Wojewódzctwo podkarpackie', true,2],
            ['Wojewódzctwo podlaskie', true,2],
            ['Wojewódzctwo pomorskie', true,2],
            ['Wojewódzctwo śląskie', true,2],
            ['Wojewódzctwo świętokrzyskie', true,2],
            ['Wojewódzctwo warmińsko-mazurskie', true,2],
            ['Wojewódzctwo wielkopolskie', true,2],
            ['Wojewódzctwo zachodniopomorskie', true,2],
            ['Wojewódzctwo łódzkie', true,2],
            ]
            },
            Program: {
            title: 'Program Tv',
            range:[38,45],
            content:[['Spis treści', false],
            ['TVP 1', true,1],
            ['TVP 2', true,1],
            ['Polsat', true,1],
            ['TVN', true,1],
            ['TVN 7', true,1],
            ['TV 4', true,1],
            ['TV Puls',true,1],
            ['Puls 2',true,1]
            ]
            },
            Surveys:{
            title: 'Ankiety',
            range:[46,48],
            content:[['Spis treści',false,2],['Ankieta miesiąca',true,3],
            ['Ankieta tygodniowa',true,3],
            ]     
            },
            Announcements: {
            title: 'Ogłoszenia',    
            range: [49,55],
            content:[['Spis treści',true,3],
                ['Ogłoszenia drobne',true,3],
                ['Reklamy',true,3],
                ['Ogłoszenia motoryzacyjne',true,3],
                ['Praca',true,3],
                ['Nekrologi',true,3],
                ['Anonse towarzyskie',true,3],
            ]   
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
            state.subpageState.subpageContent.contentArray = payload.key1
            state.subpageState.subpageContent.limitAtPage = payload.key2
            state.subpageState.subpageContent.maxPage = Math.ceil(state.subpageState.subpageContent.contentArray.length/state.subpageState.subpageContent.limitAtPage)
        },
        setPageNumber(state,value)
        {
            state.pageState.pageNumber = value
        },
        setSPageNumber(state,value)
        {
            state.subpageState.subpageContent.sPageNumber = value
        },
        setHasSubpage(state,value)
        {
            state.subpageState.hasSubpages = value
        },
        resetSubpage(state)
        {
            state.subpageState.subpageContent.sPageNumber = 1
        },
        //----------------------CHANNEL CONTENTS 
        setArrayContents(state, start, end) 
        {
            let array = new Array()
            array[0] = start
            array[1] = end
            this.state.channelContents.Contents = array
        },
        setArrayCurrencyRates(state, start, end) 
        {
            let array = new Array()
            array[0] = start
            array[1] = end
            this.state.channelContents.CurrencyRates = array
        },
        setArrayNews(state, start, end) 
        {
            let array = new Array()
            array[0] = start
            array[1] = end
            this.state.channelContents.News = array
        },
        
        getCurrenciesData(state) {
        state.channelContents.CurrencyRates.currencies= sourceDataCurrency.currencies;
        console.log(state.channelContents.CurrencyRates.currencies);
        },
    },
    actions: {
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
                console.log(response.data.rates)
                this.state.channelContents.CurrencyRates.currenciesBuySell = response.data.rates
              } catch (error) {
                console.log(error)
              }
                  
        }
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
            console.log(AllContents)
            return AllContents
        }
    },
    modules: {

    }
})