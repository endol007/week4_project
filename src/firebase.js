import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDLtkFFzpyDnHvt3dUBzIsNzk3kdbA49T0",
    authDomain: "week4-project-181a0.firebaseapp.com",
    projectId: "week4-project-181a0",
    storageBucket: "week4-project-181a0.appspot.com",
    messagingSenderId: "694145138026",
    appId: "1:694145138026:web:b888f9890c887f7c33f913",
    measurementId: "G-Q5JQZMDT7Y"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };