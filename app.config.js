const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  name: IS_DEV ? "Chat-TTS-V2-dev" : "Chat-TTS-V2",
}

/*
module.exports = () => {
  name: IS_DEV ? "Chat-TTS-V2-dev" : "Chat-TTS-V2"
}
  
    if (process.env.MY_ENVIRONMENT === 'development') {
      return {
        name: "Chat-TTS-V2-dev",

        
      };
    } else {
      return {
        name: "Chat-TTS-V2",

      };
    } 
  }*/