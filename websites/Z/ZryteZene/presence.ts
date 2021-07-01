const presence = new Presence({
  clientId: "760186894477819914",
  injectOnComplete: true
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

let music: string;
let uploader: string;
let date: Date;
let startTime: number;
let endTime: number;
let musicLen: string;
let asset = "error";

date = new Date();
startTime = date.getTime();

const slider = document.getElementsByClassName('slider-play')[0] as HTMLInputElement;

function myOutsideHeavyLiftingFunction(){
  if(document.location.href.includes('profile')) {
    music = "Viewing " + document.getElementsByClassName('text-xl')[0].innerHTML + "'s Profile Page";
    asset = "profile";
    uploader = "";
  } else if(document.location.href.includes('upload')) {
    music = "Uploading a Music";
    asset = "upload";
    uploader = "";
  } else if(document.location.href == 'https://zrytezene.thatcakeid.com/') {
    uploader = document.getElementsByClassName('text-xs')[0].innerHTML;
    music = document.getElementsByClassName('title-custom')[0].innerHTML;
  
    musicLen = document.getElementsByClassName('slider-play')[0].getAttribute('max');

    if(music == '' && uploader == '') {
      music = "Viewing Home Page";
      asset = "home";
      uploader = "";
    } else {
      uploader = "Uploaded By " + uploader;
      asset = "music";
      date = new Date();
      startTime = date.getTime();
      endTime = date.getTime() + ((parseInt(musicLen) - parseInt(slider.value)) * 1000);
    }
  } else {
    music = "Page Not Defined In Presence";
    asset = "error";
    uploader = "";
  }
}

setInterval(myOutsideHeavyLiftingFunction, 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: asset,
    smallImageKey: "icon",
    smallImageText: "ZryteZene",
    details: music,
    state: uploader,
    startTimestamp: startTime,
    endTimestamp: endTime
  };

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity(); 
  } else 
    presence.setActivity(presenceData); 
  
});
