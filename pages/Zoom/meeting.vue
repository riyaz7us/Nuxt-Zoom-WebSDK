<template>
  <div class="zoom-main"></div>
</template>

<script>
export default {
  head() {
    return {
      /*
        EQUIVALENT TO 
        <script src="...">
      */
      script: [
        { sameSite:"None",src: "https://source.zoom.us/1.9.1/lib/vendor/react.min.js" },
        { sameSite:"None",src: "https://source.zoom.us/1.9.1/lib/vendor/react-dom.min.js" },
        { sameSite:"None",src: "https://source.zoom.us/1.9.1/lib/vendor/redux.min.js" },
        { sameSite:"None",src: "https://source.zoom.us/1.9.1/lib/vendor/redux-thunk.min.js" },
        { sameSite:"None",src: "https://source.zoom.us/1.9.1/lib/vendor/lodash.min.js" },
        { sameSite:"None",src: "https://source.zoom.us/zoom-meeting-1.9.1.min.js" },
      ],
      /*
        EQUIVALENT TO 
        <link rel="..." href="...">
      */
      link: [
        {
          type: "text/css",
          rel: "stylesheet",
          href: "https://source.zoom.us/1.9.1/css/bootstrap.css",
        },
        {
          type: "text/css",
          rel: "stylesheet",
          href: "https://source.zoom.us/1.9.1/css/react-select.css",
        },
      ],
    };
  },
  data: function () {
    return {
      nickname: "Spot Verge",
      meetingId: "",
      password: "",
      signature: "",
      email: "sdriyaz712@gmail.com",
      leaveUrl: "localhost:3000/zoom/meeting"
    };
  },
  created: function () {
    //CONFIGURED MEETING ID AND PASSWORD VIA ROUTES
    this.meetingId = this.$route.query.meetingId;
    this.password = this.$route.query.password;
  },
  mounted() {
    //WHERE this.$ZoomMtg has been configured inside plugins/zoom-sdk.js
    this.$ZoomMtg.inMeetingServiceListener("onUserJoin", (data) => {
      console.log("inMeetingServiceListener onUserJoin", data);
    });
    this.getSignature();//method below ⬇️
  },
  methods: {
    getSignature() {
      /*
      GENERATED SIGNATURE FROM THE BACKEND USING PHP 
      BY SETTING ROLE=0, 'APP ID' AND  'TOKEN'  AT THE BACKEND 
      */
      this.$axios
        .get(`signature/${this.meetingId}`)
        .then((res) => {
          this.signature = res;
          this.startMeeting(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    startMeeting(signature) {
      document.getElementById("zmmtg-root").style.display = "block";
      this.$ZoomMtg.init({
        leaveUrl: this.leaveUrl,
        isSupportAV: true,
        success: (success) => {
          console.log(success);
          this.$ZoomMtg.join({
            meetingNumber: this.meetingId,
            userName: this.nickname,
            signature: signature,
            apiKey: "MY API KEY",
            userEmail: this.email,
            password: this.password,
            success: (success) => {
              console.log(success);
            },
            error: (error) => {
              console.log('initerror',error);
            },
          });
        },
        error: (error) => {
          console.log('starterror',error);
        },
      });
    },
  }, //methods
};
</script>

<style scoped>
.zoom-main {
  width: 70%;
  margin: auto;
  text-align: center;
}
.zoom-main button {
  margin-top: 20px;
  background-color: #2d8cff;
  color: #ffffff;
  text-decoration: none;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  outline: none;
}
.zoom-main button:hover {
  background-color: #2681f2;
}
</style>
