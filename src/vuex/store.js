import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';

Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store({
    state: {
        isLogin: JSON.parse(sessionStorage.getItem('isLogin')) || false,
        JWT: JSON.parse(VueCookies.get('JWT')) || false,
        userData: JSON.parse(sessionStorage.getItem('userData')) || false,
        StudentHistory: JSON.parse(sessionStorage.getItem('StudentHistory')) || false,
        StudentPreferences: JSON.parse(sessionStorage.getItem('StudentPreferences')) || false,

        Prefer: JSON.parse(sessionStorage.getItem('Prefer')) || false,
        MajorPrefer: JSON.parse(sessionStorage.getItem('MajorPrefer')) || false,

        menuCourseData: JSON.parse(sessionStorage.getItem('menuCourseData')) || false,
        courseData: JSON.parse(sessionStorage.getItem('courseData')) || false,
        chapterData: JSON.parse(sessionStorage.getItem('chapterData')) || false,
        Video: JSON.parse(sessionStorage.getItem('Video')) || false,
        SearchedCourseData: JSON.parse(sessionStorage.getItem('SearchedCourseData')) || false,
        RelatedCourses: JSON.parse(sessionStorage.getItem('RelatedCourses')) || false,

        MenuLiveData: JSON.parse(sessionStorage.getItem('MenuLiveData')) || false,

        commentData: JSON.parse(sessionStorage.getItem('commentData')) || [],
        teacherData: {
            teacherClassData: JSON.parse(sessionStorage.getItem('teacherClassData')) || [],
            teacherChapterData: JSON.parse(sessionStorage.getItem('teacherChapterData')) || [],
            teacherVideoData: JSON.parse(sessionStorage.getItem('teacherVideoData')) || [],
            analysisComment: JSON.parse(sessionStorage.getItem('analysisComment')) || {},
            liveData: JSON.parse(sessionStorage.getItem('liveData')) || [],
        },   //教师管理后台用的
        breadcrumb: [],
        isLoginTeacher: JSON.parse(sessionStorage.getItem('isLoginTeacher')) || false,
    },
    mutations: {
        //是否学生登录
        saveIsLogin(state) {
            state.isLogin = !state.isLogin;
            sessionStorage.setItem('isLogin', JSON.stringify(state.isLogin));
        },
        //是否老师登录
        saveIsLoginTeacher(state) {
            state.isLoginTeacher = !state.isLoginTeacher;
            sessionStorage.setItem('isLoginTeacher', JSON.stringify(state.isLoginTeacher));
        },
        //JWT信息
        saveJWT(state, JWT) {
            state.JWT = JWT;
            VueCookies.set('JWT', JSON.stringify(state.JWT), "7D");
        },
        //学生历史记录
        saveStudentHistory(state, StudentHistory) {
            state.StudentHistory = StudentHistory;
            sessionStorage.setItem('StudentHistory', JSON.stringify(state.StudentHistory));
        },
        //学生偏好
        saveStudentPreferences(state, StudentPreferences) {
            state.StudentPreferences = StudentPreferences;
            sessionStorage.setItem('StudentPreferences', JSON.stringify(state.StudentPreferences));
        },
        //学生头像
        saveAvatar(state) {
            state.userData.studentPicUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
            sessionStorage.setItem('userData', JSON.stringify(state.userData));
        },
        //教师头像
        saveAvatarTeacher(state) {
            state.userData.teacherPicUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
            sessionStorage.setItem('userData', JSON.stringify(state.userData));
        },
        //教师学生专业
        saveMajor(state) {
            state.userData.major = {
                majorContent: '',
            };
            sessionStorage.setItem('userData', JSON.stringify(state.userData));
        },
        //用户信息
        saveData(state, userData) {
            state.userData = userData;
            sessionStorage.setItem('userData', JSON.stringify(state.userData));
        },
        //所有专业+子专业
        saveMajorAndPrefer(state, MajorPrefer) {
            state.MajorPrefer = MajorPrefer;
            sessionStorage.setItem('MajorPrefer', JSON.stringify(state.MajorPrefer));
        },
        //某专业的子专业
        savePrefer(state, Prefer) {
            state.Prefer = Prefer;
            sessionStorage.setItem('Prefer', JSON.stringify(state.Prefer));
        },
        //课程菜单页面的课程信息
        saveMenuCourseData(state, menuCourseData) {
            state.menuCourseData = menuCourseData;
            sessionStorage.setItem('menuCourseData', JSON.stringify(state.menuCourseData));
        },
        //单个课程信息
        saveCourseData(state, courseData) {
            state.courseData = courseData;
            sessionStorage.setItem('courseData', JSON.stringify(state.courseData));
        },
        //视频信息
        saveVideo(state, Video) {
            state.Video = Video;
            sessionStorage.setItem('Video', JSON.stringify(state.Video));
        },
        //课程章节信息
        saveChapterData(state, chapterData) {
            state.chapterData = chapterData;
            sessionStorage.setItem('chapterData', JSON.stringify(state.chapterData));
        },
        //相关课程信息
        saveRelatedCourses(state, RelatedCourses) {
            state.RelatedCourses = RelatedCourses;
            sessionStorage.setItem('RelatedCourses', JSON.stringify(state.RelatedCourses));
        },
        //直播菜单页面的课程信息
        saveMenuLiveData(state, MenuLiveData) {
            state.MenuLiveData = MenuLiveData;
            sessionStorage.setItem('MenuLiveData', JSON.stringify(state.MenuLiveData));
        },
        saveSearchedCourseData(state, SearchedCourseData) {
            state.SearchedCourseData = SearchedCourseData;
            sessionStorage.setItem('SearchedCourseData', JSON.stringify(state.SearchedCourseData));
        },
        saveTeacherClassData(state, teacherClassData) {
            state.teacherData.teacherClassData = teacherClassData;
            sessionStorage.setItem('teacherClassData', JSON.stringify(state.teacherData.teacherClassData));
        },
        saveTeacherChapterData(state, teacherChapterData) {
            state.teacherData.teacherChapterData = teacherChapterData;
            sessionStorage.setItem('teacherChapterData', JSON.stringify(state.teacherData.teacherChapterData));
        },
        saveTeacherVideoData(state, teacherVideoData) {
            state.teacherData.teacherVideoData = teacherVideoData;
            sessionStorage.setItem('teacherVideoData', JSON.stringify(state.teacherData.teacherVideoData));
        },
        savebreadcrumb(state, breadcrumb) {
            state.breadcrumb = breadcrumb;
        },
        saveCommentData(state, commentData) {
            state.commentData = commentData;
            sessionStorage.setItem('commentData', JSON.stringify(state.commentData));
        },
        saveAnalysisComment(state, analysisComment) {
            state.teacherData.analysisComment = analysisComment;
            sessionStorage.setItem('analysisComment', JSON.stringify(state.teacherData.analysisComment));
        },
        saveLiveData(state, liveData) {
            state.teacherData.liveData = liveData;
            sessionStorage.setItem('liveData', JSON.stringify(state.teacherData.liveData));
        },
    }
})

