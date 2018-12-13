export default {
    userActivities: {
        count: 0,
        data: []
    },
    activity: {
        name: '',
        text: '',
        category: '',
        music: '',
        incorrectSound: '',
        correctSound: '',
        styles: {
            backgroundColor: '',
            color: ''
        },
        allow_anon: false,
        allow_feedback: false,
        blanks: [],
        options: [],
        feedback: [],
        answers: []
    },
    game: {
        activities: [],
        answers: []
    },
    results: {
        count: 0,
        data: [],
        passrate: 0,
        avg_time: 0
    },
    asyncCalls: 0,
    user: {
        username: '',
        password: '',
        roles: '',
        email: ''
    }
}
