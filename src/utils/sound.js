import Sound from "react-native-sound";

// Enable playback in silence mode
Sound.setCategory("Playback");

// Load the sound file 'coin.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
export const coinSound = new Sound("coin.mp3", Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log("failed to load the sound", error);
    return;
  }
  // loaded successfully
  console.log(
    "duration in seconds: " +
      coinSound.getDuration() +
      "number of channels: " +
      coinSound.getNumberOfChannels()
  );
});

coinSound.setVolume(1);
// coinSound.setCurrentTime(1);
//
// setTimeout(
//   () =>
//     coinSound.play(success => {
//       if (success) {
//         console.log("successfully finished playing");
//       } else {
//         console.log("playback failed due to audio decoding errors");
//         // reset the player to its uninitialized state (android only)
//         // this is the only option to recover after an error occured and use the player again
//         coinSound.reset();
//       }
//     }),
//   1000
// );
