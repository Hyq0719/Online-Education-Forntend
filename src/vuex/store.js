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
        StudentCollect: JSON.parse(sessionStorage.getItem('StudentCollect')) || false,
        StudentPreferences: JSON.parse(sessionStorage.getItem('StudentPreferences')) || false,

        Prefer: JSON.parse(sessionStorage.getItem('Prefer')) || false,
        MajorPrefer: JSON.parse(sessionStorage.getItem('MajorPrefer')) || false,
        MainMenuCourseData: JSON.parse(sessionStorage.getItem('MainMenuCourseData')) || false,
        MainMenuLiveData: JSON.parse(sessionStorage.getItem('MainMenuLiveData')) || false,

        MenuCourseData: JSON.parse(sessionStorage.getItem('MenuCourseData')) || false,
        courseData: JSON.parse(sessionStorage.getItem('courseData')) || false,
        chapterData: JSON.parse(sessionStorage.getItem('chapterData')) || false,
        Video: JSON.parse(sessionStorage.getItem('Video')) || false,
        RelatedCourses: JSON.parse(sessionStorage.getItem('RelatedCourses')) || false,
        TaskInfo: JSON.parse(sessionStorage.getItem('TaskInfo')) || false,
        TaskFile: JSON.parse(sessionStorage.getItem('TaskFile')) || false,
        HomeworkInfo: JSON.parse(sessionStorage.getItem('HomeworkInfo')) || false,
        HomeworkFile: JSON.parse(sessionStorage.getItem('HomeworkFile')) || false,
        TeacherMenuCourseData: JSON.parse(sessionStorage.getItem('TeacherMenuCourseData')) || false,

        SearchedCourseData: JSON.parse(sessionStorage.getItem('SearchedCourseData')) || false,

        MenuLiveData: JSON.parse(sessionStorage.getItem('MenuLiveData')) || false,

        commentData: JSON.parse(sessionStorage.getItem('commentData')) || [],
        teacherData: {
            teacherClassData: JSON.parse(sessionStorage.getItem('teacherClassData')) || [],
            teacherChapterData: JSON.parse(sessionStorage.getItem('teacherChapterData')) || [],
            teacherVideoData: JSON.parse(sessionStorage.getItem('teacherVideoData')) || [],
            analysisComment: JSON.parse(sessionStorage.getItem('analysisComment')) || {},
            liveData: JSON.parse(sessionStorage.getItem('liveData')) || [],
            taskData: JSON.parse(sessionStorage.getItem('taskData')) || [],
            homeworkData: JSON.parse(sessionStorage.getItem('homeworkData')) || [],
        },   //教师管理后台用的
        breadcrumb: [],
        isLoginTeacher: JSON.parse(sessionStorage.getItem('isLoginTeacher')) || false,
        isLoginAdmin: JSON.parse(sessionStorage.getItem('isLoginAdmin')) || false,

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
        saveIsLoginAdmin(state) {
            state.isLoginAdmin = !state.isLoginAdmin;
            sessionStorage.setItem('isLoginAdmin', JSON.stringify(state.isLoginAdmin));
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
        //学生课程收藏
        saveStudentCollect(state, StudentCollect) {
            state.StudentCollect = StudentCollect;
            sessionStorage.setItem('StudentCollect', JSON.stringify(state.StudentCollect));
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
        //首页课程信息
        saveMainMenuCourseData(state, MainMenuCourseData) {
            state.MainMenuCourseData = MainMenuCourseData;
            sessionStorage.setItem('MainMenuCourseData', JSON.stringify(state.MainMenuCourseData));
        },
        //首页直播信息
        saveMainMenuLiveData(state, MainMenuLiveData) {
            state.MainMenuLiveData = MainMenuLiveData;
            sessionStorage.setItem('MainMenuLiveData', JSON.stringify(state.MainMenuLiveData));
        },


        //课程菜单页面的课程信息
        saveMenuCourseData(state, MenuCourseData) {
            state.MenuCourseData = MenuCourseData;
            sessionStorage.setItem('MenuCourseData', JSON.stringify(state.MenuCourseData));
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
        //任务信息
        saveTaskInfo(state, TaskInfo) {
            state.TaskInfo = TaskInfo;
            sessionStorage.setItem('TaskInfo', JSON.stringify(state.TaskInfo));
        },
        //任务文件
        saveTaskFile(state, TaskFile) {
            state.TaskFile = TaskFile;
            sessionStorage.setItem('TaskFile', JSON.stringify(state.TaskFile));
        },
        //作业信息
        saveHomeworkInfo(state, HomeworkInfo) {
            state.HomeworkInfo = HomeworkInfo;
            sessionStorage.setItem('HomeworkInfo', JSON.stringify(state.HomeworkInfo));
        },
        //作业文件信息
        saveHomeworkFile(state, HomeworkFile) {
            state.HomeworkFile = HomeworkFile;
            sessionStorage.setItem('HomeworkFile', JSON.stringify(state.HomeworkFile));
        },
        //老师的课程信息
        saveTeacherMenuCourseData(state, TeacherMenuCourseData) {
            state.TeacherMenuCourseData = TeacherMenuCourseData;
            sessionStorage.setItem('TeacherMenuCourseData', JSON.stringify(state.TeacherMenuCourseData));
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
        saveTaskData(state, taskData) {
            state.teacherData.taskData = taskData;
            sessionStorage.setItem('TaskData', JSON.stringify(state.teacherData.taskData));
        },
        saveHomeworkData(state, homeworkData) {
            state.teacherData.homeworkData = homeworkData;
            sessionStorage.setItem('homeworkData', JSON.stringify(state.teacherData.homeworkData));
        },
    }
})

