import {createStore} from 'vuex'
import axios from 'axios';
import sourceDataCurrency from '@/datacurrency.json'
import sourceDataWeather from '@/dataweather.json'
import CoinpaprikaAPI from '@coinpaprika/api-nodejs-client'
import VueJwtDecode from 'vue-jwt-decode'
import router from '../router/index'
export default createStore({
    state: {
        currentDate: null,
        user:{
          isLogged:false,
          name:null,
          id:null,
          userAnnouncements:[],
          allCategories:[],
          allSurveys:[],
        },
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
                limitDigitsAtPage:500,
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
            ['Aktualny Kurs Złota', true,10,'goldPrice'],
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
            CryptoRatesContents:[], 
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
            range:[38,43],
            content:[['Spis treści', false,0,'ProgramContents'],
            ['TVP 1', true,1,'tvp1'],
            ['TVP 2', true,1,'tvp2'],
            ['TVP INFO', true,1,'tvpinf'],
            ['TVP SPORT', true,1,'tvpksp'],
            ['TVP NAUKA', true,1,'tvpnk'],
            ['TVP KULTURA', true,1,'tvpktr'],
            ],
            ProgramContents:[''],
            tvp1:[],
            tvp2:[],
            tvpinf:[],
            tvpksp:[],
            tvpnk:[],
            tvpktr:[],
            },
            Surveys:{
            title: 'Ankiety',
            range:[44,46],
            content:[['Spis treści - dostępne ankiety',false,10,'SurveysContents']
            ],
            SurveysContents:[''],
             
            },
            Announcements: {
            title:'Ogłoszenia',    
            range: [47,53],
            content:[['Spis treści',false,10,'AnnouncementsContents'],],
            AnnouncementsContents:[],
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
                  if(state.subpageState.subpageContent.title.includes("Wiadomości"))
                  {
                     let contentNews="";
                     state.subpageState.subpageContent.contentArray[0].forEach(article => {
                     contentNews+=article[0]
                     contentNews+=article[1]
                    });
                    state.subpageState.subpageContent.maxPage = Math.ceil(contentNews.length/state.subpageState.subpageContent.limitDigitsAtPage)
                  }
                  else
                  {
                   state.subpageState.subpageContent.maxPage = Math.ceil(state.subpageState.subpageContent.contentArray.length/state.subpageState.subpageContent.limitAtPage)
                  }
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
        },
        //-------Announcements methods
        makeCategoryAnnouncement(state,payload)
        {
          let categoryslug = payload.category_name_slug;
          let category = payload.category_name;
          let id = payload.categoryId;
          state.channelContents.Announcements[categoryslug] = []
          category = category.charAt(0).toUpperCase() + category.slice(1);
          state.channelContents.Announcements.content.push([category,true,3,categoryslug,id])
        },
        setAnnouncementsRange(state)
        {
          let categorysize = state.channelContents.Announcements.content.length-1;
          //console.log(categorysize);
          state.channelContents.Announcements.range[0]=state.channelContents.Surveys.range[1]+1;
          state.channelContents.Announcements.range[1]=state.channelContents.Announcements.range[0]+categorysize;
        },
        fillAnnouncements(state,payload)
        {
            let id = payload.id
            let title = payload.title
            let desc =payload.desc
            state.channelContents.Announcements.content.forEach(element => {
              if(element[4] == id)
              {
                let array = element[3];
                state.channelContents.Announcements[array].push([title,desc])
              }
            })
            
        },
        //Surveys methods
        makeSurveys(state,payload)
        {
          let slug_survey = payload.slug_survey;
          let survey_question = payload.survey_question;
          let surveyId = payload.surveyId;
          state.channelContents.Surveys[slug_survey] = []
          state.channelContents.Surveys.content.push([survey_question,false,1,slug_survey,surveyId])
        },
        setSurveyRange(state)
        {
          let surveySize = state.channelContents.Surveys.content.length-1;
          state.channelContents.Surveys.range[1]=state.channelContents.Surveys.range[0]+surveySize;
        },
        fillSurveys(state,payload)
        { 
            let survey_id = payload.survey_id;
            let survey_title = payload.survey_title
            let survey_results = payload.survey_results
            state.channelContents.Surveys.content.forEach(element => {
              if(element[4] == survey_id)
              {
                let array = element[3];
                state.channelContents.Surveys[array].push([survey_title,survey_results])
              }
            })
            
        },
        //Login & Register Methods
        getUserInfo(state)
        {
          let token = localStorage.getItem("userTokenAccess");
          let decode = VueJwtDecode.decode(token)
          state.user.name = decode.name
          state.user.id = decode.user_id
          state.user.isLogged = true;
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
                const response = await axios.get('https://api.nbp.pl/api/cenyzlota/last/30/?format=json');
                this.state.channelContents.CurrencyRates.goldPrice = response.data
              } catch (error) {
                console.log(error)
              }      
        },
        async getMetalPrices(){
            try {
                const response = await axios.get('https://metals-api.com/api/latest?access_key='+process.env.VUE_APP_API_KEY_METAL+'&base=USD&symbols=XAG%2CXPD%2CXPT%2CXRH%2CALU%2CNI%2CZNC%2CTIN%2CLCO%2CIRD%2C+LEAD%2C+IRON%2CURANIUM%2CBRONZE%2CMG%2COSMIUM%2CLITHIUM%09%09');
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
          axios.get('https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/latest').then(response => { state.commit('setBitcoinInfo',response.data[0])}).catch(console.error)
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
            return axios.get(url).then(  function(r1) {
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
            }).catch(error => {
              console.error(error)
              
              return Promise.reject(error)
            })
        },
        //Weather Actions
        async getWeatherParams() {
          this.state.channelContents.Weather.cities.forEach( async (element) =>  {
              try {
                  const response = await axios.get('https://api.weatherapi.com/v1/forecast.json?key='+process.env.VUE_APP_API_KEY_WEATHER+'&q='+element.slug+'&hour=12&lang=pl&days=3');
                  let days = response.data.forecast.forecastday
              
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
                  
                  element.params = cityparams
                } catch (error) {
                  console.log(error);
                  element.rate = 'BRAK DANYCH'  
                }
          });
      },
      //TV Program Actions
      async getProgram() {
          return await axios.get(process.env.VUE_APP_API_BACKEND+'/ProgramItems/').then(response => { let trimmedData = response.data;
            trimmedData = trimmedData.slice(0,42)
            trimmedData.forEach(element => {
                let channelID = element.program_ID;
              //let channelDate = element.program_date;
              let channelData = element.program_data.split("\r\n");
              let channelDataShort = []
              channelDataShort.push(channelData[0]);
              channelData.forEach( elProg => {
                let indof = elProg.indexOf(';');
                elProg = elProg.substring(0, indof);
                channelDataShort.push(elProg)
              })
                channelID = channelID.toLowerCase();
                this.state.channelContents.Program[channelID].push(channelDataShort);
            })}).catch(error => {
              console.error(error)
              // also make sure you don't accidentally convert this to a successful response
              return Promise.reject(error)
            })
         
        
        
      }, 
      MockProgram(){
        let loremipsum =["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec massa quis nunc suscipit posuere. Nunc nec ornare nunc. Nullam vehicula et lorem eu suscipit. Proin nec varius justo."]
        this.state.channelContents.Program.tvp1.push(loremipsum);
        this.state.channelContents.Program.tvp2.push(loremipsum)
        this.state.channelContents.Program.tvpinf.push(loremipsum)
        this.state.channelContents.Program.tvpksp.push(loremipsum)
        this.state.channelContents.Program.tvpktr.push(loremipsum)
        this.state.channelContents.Program.tvpnk.push(loremipsum)
      },
      //---------------Announcements Actions
      async getAnnouncementsCategories({commit,getters,dispatch }){
        return await axios.get(process.env.VUE_APP_API_BACKEND+'/ad/api/annoucements/category/').then(response => {
          response.data.forEach(element => {
            let category = element.category_name;
            let categoryId = element.id;
            let slug_category = getters.polishCharacterSlugger(category)
            slug_category = slug_category.toLowerCase();
            let payload = {category_name_slug: slug_category,category_name: category,categoryId: categoryId};
            commit('makeCategoryAnnouncement',payload);
          })
          commit('setAnnouncementsRange');
          dispatch('setAnnouncementsCategories');
        }).catch(error => {
          console.error(error)
          // also make sure you don't accidentally convert this to a successful response
          return Promise.reject(error)
        })
          
      },
      async setAnnouncementsCategories({commit}){
          this.state.channelContents.Announcements.content.forEach( async element => {
            if(element.length==5)
            {
              let id = element[4];
               try{
                const response = await axios.get(process.env.VUE_APP_API_BACKEND+'/ad/api/annoucements/category/'+id);
                response.data.forEach( ann => {
                let an_title = ann.title;
                let an_desc = ann.description;
                let payload = {id: id,title: an_title,desc: an_desc};
                commit('fillAnnouncements',payload);  
                })
              }catch(error){
              console.log(error)
              }
              
            }
          })
          commit('setChannelsContents');
      },
      //-------Survey Actions
      async getAllSurveys({commit,getters,dispatch }){
        try{
          const response = await axios.get(process.env.VUE_APP_API_BACKEND+'/polls/api/polls/');
          response.data.forEach(element => {
            let survey_question = element.question;
            let surveyId = element.id;
            let slug_survey = getters.polishCharacterSlugger(survey_question);
            slug_survey = slug_survey.toLowerCase().replace(/\s/g, "").slice(0,-1);
            let payload = {slug_survey: slug_survey,survey_question: survey_question,surveyId: surveyId};
            commit('makeSurveys',payload);
          })
          commit('setSurveyRange');
          dispatch('setAllSurveys');
        }catch(error){
          console.log(error)
        }
      },
      async setAllSurveys({commit}){
        this.state.channelContents.Surveys.content.forEach( async element => {
          if(element.length==5)
          {
            let id = element[4];
             try{
              const response = await axios.get(process.env.VUE_APP_API_BACKEND+'/polls/api/polls/combo/'+id+'/result');
              let results = []
              response.data.result.forEach( surv => {
                
              results.push([surv.choice,surv.result])
              })
            // console.log(results);
              let surv_title = element[0];
              let payload = {survey_title: surv_title,survey_results: results,survey_id: id};
              commit('fillSurveys',payload);  
            }catch(error){
            console.log(error)
            }
            
          }
        })
       // console.log(this.state.channelContents.Surveys)
        commit('setAnnouncementsRange');
        commit('setChannelsContents');
    },
    //-----Login & Register Actions 

    async loginUser(state,payload) {
      try {
        let email=payload.email
        let password=payload.password
        const res = await fetch(
          process.env.VUE_APP_API_BACKEND+"/accounts/api/token/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email,
                password
              })
            }
        );
        const data = await res.json();
       // console.log(data[Object.keys(data)[1]]);
        let tokenAccess = data.access;
        let tokenRefresh = data.refresh;   
        localStorage.setItem("userTokenAccess", tokenAccess);
        localStorage.setItem("userTokenRefresh",tokenRefresh);
        // navigate to a protected resource
       router.push("/profile");
      } catch (err) {
        console.log(err.response);
      }
    },
    //User Actions
    async getUserAnnouncements(){
      try{
        const response = await axios.get(process.env.VUE_APP_API_BACKEND+'/accounts/api/profile/annoucements', {
          headers:
          {
            'Authorization': 'Bearer '+localStorage.getItem('userTokenAccess')
          }
        });
       // console.log(response.data)
       response.data.forEach( element => {
        if(this.state.user.userAnnouncements.length<response.data.length)
        {this.state.user.userAnnouncements.push({title:element.title,description:element.description,id:element.id, status:element.annoucement_status,category_name:element.category_name})}
       })
      // console.log(this.state.user.userAnnouncements)
      }catch(error){
      console.log(error)
      }
    },
    async getOnlyCategories(){
      await axios.get(process.env.VUE_APP_API_BACKEND+'/ad/api/annoucements/category/').then(response => {
        response.data.forEach(element => {
          if(this.state.user.allCategories.length < response.data.length)
          {
            let category = element.category_name;
          let categoryId = element.id;
          let payload = {category_name: category,categoryId: categoryId};
          this.state.user.allCategories.push(payload)
         // console.log(this.state.user.allCategories)
          }
        })
      })
    },
    async addAnn(state,payload) {
      let title = payload.title;
      let description=payload.description
      let category_name= payload.categoryId
     // console.log(payload)
      const res = await fetch(
        process.env.VUE_APP_API_BACKEND+"/ad/api/annoucements",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: 'Bearer ' + localStorage.getItem("userTokenAccess"),
            },
            body: JSON.stringify({
              title,
              description,
              category_name
            })
          }
      );
      const data = await res.json();
   console.log(data)
    },
    async getOnlyAllSurveys(){
      try{
        const response = await axios.get(process.env.VUE_APP_API_BACKEND+'/polls/api/polls/');
        response.data.forEach(element => {
          if(this.state.user.allSurveys.length < response.data.length)
          {
            let survey_question = element.question;
          let surveyId = element.id;
          let payload = {survey_question: survey_question,surveyId: surveyId,choicesArray:null};
          this.state.user.allSurveys.push(payload)
          }
        })
        this.dispatch('getOnlyAnswers')
      }catch(error){
        console.log(error)
      }
    },
    async getOnlyAnswers(){
      this.state.user.allSurveys.forEach( async (element,index) => {
          let id = element.surveyId
           try{
            const response = await axios.get(process.env.VUE_APP_API_BACKEND+'/polls/api/polls/'+id+'/choices/');
            let arrayChoices= []
            response.data.forEach( choice => {
            arrayChoices.push({id:choice.id,poll:choice.poll,choice_name:choice.choice_name})
            })
            this.state.user.allSurveys[index].choicesArray = arrayChoices
          }catch(error){
          console.log(error)
          }
        })
        //console.log(this.state.user.allSurveys)
      },
      async voteSurvey(state,table){

        table.forEach( async element => {
          let poll = element.poll
          let id = element.id
          let choice = id
          let vote_user = this.state.user.id
          const res = await fetch(
            process.env.VUE_APP_API_BACKEND+"/polls/api/polls/"+poll+"/choices/"+id,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: 'Bearer ' + localStorage.getItem("userTokenAccess"),
                },
                body: JSON.stringify({
                  poll,
                  choice,
                  vote_user,
                })
              }
          );
          const data = await res.json();
        console.log(data)
        })
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
            if(spage == state.subpageState.subpageContent.maxPage)
            {
              end = x.lastIndexOf(".")+1;
            }
            else
            {
            end = x.lastIndexOf(" ");
            }
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
        },
        polishCharacterSlugger: (state) => (sentence) =>
         {
          let a = state.currentDate;
           const replacements = {
               'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
               'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
           };
             let text = a
             text = sentence
             let result = '';
         for (let i = 0; i < text.length; ++i) {
         const entry = text[i];
         result += replacements[entry] ?? entry;
         }
         return result
         }
    },
    modules: {

    }
})