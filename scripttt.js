/* =========================================================
   STUDENT REPORT GENERATOR
   COMPLETE CLEANED script.js
   ========================================================= */
/* =========================================================
   WEBSITE IDENTIFICATION
   ========================================================= */

const WEBSITE_ID = "reportgen1";

const WEBSITE_NAME = "ReportSheet";

const WEBSITE_URL =
    "https://reportgen1.github.io/ReportSheet/";
/* =========================================================
   STUDENT REPORT GENERATOR
   COMPLETE CLEANED script.js
   ========================================================= */

/* =========================================================
   SUPABASE
   ========================================================= */

const SUPABASE_URL =
    "https://nzeddvcmabfodmvmgsyg.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_Iaro_sV4r31wPbLycRB4Eg_OCDBy2u3";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================================================
   PAYSTACK
   ========================================================= */

const PAYSTACK_PUBLIC_KEY =
    "pk_test_255b1c6ede75477e3ed59e874ebb68d9e204f844";


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let students = [];

let currentSubscriptionPlan = "";

let reportsGenerated = 0;

let currentUserId = null;


/* =========================================================
   LOCAL DATA STORAGE
   ========================================================= */

const STUDENT_DATA_STORAGE_KEY =
    "studentReportGeneratorData";

const STUDENT_SUBJECTS_STORAGE_KEY =
    "studentReportGeneratorSubjects";

const REPORT_SETTINGS_STORAGE_KEY =
    "studentReportGeneratorSettings";

const GENERATED_REPORTS_STORAGE_KEY =
    "studentReportGeneratorGeneratedReports";


/* =========================================================
   SAVE APP DATA
   ========================================================= */

function saveAppData() {

    try {

        localStorage.setItem(
            STUDENT_DATA_STORAGE_KEY,
            JSON.stringify(students)
        );

        localStorage.setItem(
            STUDENT_SUBJECTS_STORAGE_KEY,
            JSON.stringify(schoolSubjects)
        );

        localStorage.setItem(
            REPORT_SETTINGS_STORAGE_KEY,
            JSON.stringify(reportSettings)
        );

    } catch (error) {

        console.error(
            "Unable to save app data:",
            error
        );

    }

}


/* =========================================================
   RESTORE APP DATA
   ========================================================= */

function restoreAppData() {

    try {

        const savedStudents =
            localStorage.getItem(
                STUDENT_DATA_STORAGE_KEY
            );

        const savedSubjects =
            localStorage.getItem(
                STUDENT_SUBJECTS_STORAGE_KEY
            );

        const savedSettings =
            localStorage.getItem(
                REPORT_SETTINGS_STORAGE_KEY
            );


        /* =========================
           STUDENTS
           ========================= */

        if (savedStudents) {

            const parsedStudents =
                JSON.parse(savedStudents);

            if (
                Array.isArray(
                    parsedStudents
                )
            ) {

                students =
                    parsedStudents;

            }

        }


        /* =========================
           SUBJECTS
           ========================= */

        if (savedSubjects) {

            const parsedSubjects =
                JSON.parse(savedSubjects);

            if (
                Array.isArray(
                    parsedSubjects
                ) &&
                parsedSubjects.length > 0
            ) {

                schoolSubjects =
                    parsedSubjects;

            }

        }


        /* =========================
           SETTINGS
           ========================= */

        if (savedSettings) {

            const parsedSettings =
                JSON.parse(savedSettings);

            if (
                parsedSettings &&
                typeof parsedSettings === "object"
            ) {

                reportSettings = {
                    ...reportSettings,
                    ...parsedSettings
                };

            }

        }


        /* =========================
           RESTORE STUDENTS
           ========================= */

        if (students.length > 0) {

            students.forEach(
                function (student) {

                    if (
                        !student.__behavior
                    ) {

                        student.__behavior = {};

                    }

                }
            );


            loadStudents();


            if (reportSection) {

                reportSection.style.display =
                    "block";

            }


            updateReportStatus();


            setFileStatus(
                "✅ Previous Excel data restored. " +
                students.length +
                " student record(s) available."
            );

        }


        renderSubjectList();

    } catch (error) {

        console.error(
            "Unable to restore app data:",
            error
        );

    }

}


/* =========================================================
   SAVE GENERATED REPORTS
   ========================================================= */

function saveGeneratedReports() {

    if (!reportContainer) {
        return;
    }

    try {

        const reportsHTML =
            reportContainer.innerHTML;

        localStorage.setItem(
            GENERATED_REPORTS_STORAGE_KEY,
            reportsHTML
        );

    } catch (error) {

        console.error(
            "Unable to save generated reports:",
            error
        );

    }

}


/* =========================================================
   RESTORE GENERATED REPORTS
   ========================================================= */

function restoreGeneratedReports() {

    if (!reportContainer) {
        return;
    }

    try {

        const savedReports =
            localStorage.getItem(
                GENERATED_REPORTS_STORAGE_KEY
            );

        if (
            savedReports &&
            savedReports.trim() !== ""
        ) {

            reportContainer.innerHTML =
                savedReports;

        }

    } catch (error) {

        console.error(
            "Unable to restore generated reports:",
            error
        );

    }

}


/* =========================================================
   CLEAR GENERATED REPORTS
   ========================================================= */

function clearGeneratedReports() {

    try {

        localStorage.removeItem(
            GENERATED_REPORTS_STORAGE_KEY
        );

    } catch (error) {

        console.error(
            "Unable to clear generated reports:",
            error
        );

    }

}


/* =========================================================
   REPORT GENERATION LIMITS
   ========================================================= */

const REPORT_LIMITS = {

    basic: 100,

    standard: 500,

    premium: 1000

};


/* =========================================================
   SCHOOL SUBJECTS
   ========================================================= */

let schoolSubjects = [

    "Mathematics",
    "English",
    "Biology",
    "Physics",
    "Chemistry",
    "Computer Science"

];


/* =========================================================
   BEHAVIORAL TRAITS
   ========================================================= */

const behavioralTraits = [

    "Attendance",
    "Punctuality",
    "Class Participation",
    "Neatness",
    "Honesty"

];


/* =========================================================
   REPORT SETTINGS
   ========================================================= */

let reportSettings = {

    schoolName:
        "YOUR SCHOOL NAME",

    schoolAddress:
        "YOUR SCHOOL ADDRESS",

    firstCAMaximum:
        20,

    secondCAMaximum:
        20,

    examsMaximum:
        60,

    gradeA:
        70,

    gradeB:
        60,

    gradeC:
        50,

    gradeD:
        45,

    gradeE:
        40,

    gradeF:
        0

};


const TEMPLATE_STUDENT_ROWS = 300;


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

let authSection;

let appSection;

let subscriptionPlans;

let subscriptionStatus;

let emailInput;

let passwordInput;

let signUpButton;

let signInButton;

let logoutButton;

let authStatus;

let downloadTemplateButton;

let excelFileInput;

let fileStatus;

let reportSection;

let studentSelect;

let generateReportButton;

let generateAllButton;

let reportContainer;


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeElements();

        attachAuthenticationEvents();

        attachApplicationEvents();

        createSubjectManager();

        restoreAppData();

        restoreGeneratedReports();

        checkLogin();

    }
);


/* =========================================================
   INITIALIZE ELEMENTS
   ========================================================= */

function initializeElements() {

    authSection =
        document.getElementById(
            "authSection"
        );

    appSection =
        document.getElementById(
            "appSection"
        );

    subscriptionPlans =
        document.getElementById(
            "subscriptionPlans"
        );

    subscriptionStatus =
        document.getElementById(
            "subscriptionStatus"
        );

    emailInput =
        document.getElementById(
            "email"
        );

    passwordInput =
        document.getElementById(
            "password"
        );

    signUpButton =
        document.getElementById(
            "signUpButton"
        );

    signInButton =
        document.getElementById(
            "signInButton"
        );

    logoutButton =
        document.getElementById(
            "logoutButton"
        );

    authStatus =
        document.getElementById(
            "authStatus"
        );

    downloadTemplateButton =
        document.getElementById(
            "downloadTemplate"
        );

    excelFileInput =
        document.getElementById(
            "excelFile"
        );

    fileStatus =
        document.getElementById(
            "fileStatus"
        );

    reportSection =
        document.getElementById(
            "reportSection"
        );

    studentSelect =
        document.getElementById(
            "studentSelect"
        );

    generateReportButton =
        document.getElementById(
            "generateReport"
        );

    generateAllButton =
        document.getElementById(
            "generateAll"
        );

    reportContainer =
        document.getElementById(
            "reportContainer"
        );

}


/* =========================================================
   ELEMENT EXISTS
   ========================================================= */

function elementExists(element) {

    return (
        element !== null &&
        element !== undefined
    );

}


/* =========================================================
   SHOW LOGIN
   ========================================================= */

function showLogin() {

    if (
        elementExists(
            authSection
        )
    ) {

        authSection.style.display =
            "block";

    }

    if (
        elementExists(
            subscriptionPlans
        )
    ) {

        subscriptionPlans.style.display =
            "none";

    }

    if (
        elementExists(
            appSection
        )
    ) {

        appSection.style.display =
            "none";

    }

    if (
        elementExists(
            subscriptionStatus
        )
    ) {

        subscriptionStatus.style.display =
            "none";

    }

}


/* =========================================================
   SHOW SUBSCRIPTION
   ========================================================= */

function showSubscription() {

    if (
        elementExists(
            authSection
        )
    ) {

        authSection.style.display =
            "none";

    }

    if (
        elementExists(
            subscriptionPlans
        )
    ) {

        subscriptionPlans.style.display =
            "block";

    }

    if (
        elementExists(
            appSection
        )
    ) {

        appSection.style.display =
            "none";

    }

    if (
        elementExists(
            subscriptionStatus
        )
    ) {

        subscriptionStatus.style.display =
            "block";

    }

}


/* =========================================================
   SHOW APPLICATION
   ========================================================= */

function showApp() {

    if (
        elementExists(
            authSection
        )
    ) {

        authSection.style.display =
            "none";

    }

    if (
        elementExists(
            subscriptionPlans
        )
    ) {

        subscriptionPlans.style.display =
            "none";

    }

    if (
        elementExists(
            appSection
        )
    ) {

        appSection.style.display =
            "block";

    }

    if (
        elementExists(
            subscriptionStatus
        )
    ) {

        subscriptionStatus.style.display =
            "block";

    }

}


/* =========================================================
   AUTHENTICATION EVENTS
   ========================================================= */

function attachAuthenticationEvents() {


    /* =========================
       SIGN UP
       ========================= */

    if (
        elementExists(
            signUpButton
        )
    ) {

        signUpButton.addEventListener(
            "click",
            async function () {

                const email =
                    emailInput.value.trim();

                const password =
                    passwordInput.value;


                if (
                    !email ||
                    !password
                ) {

                    setAuthStatus(
                        "❌ Please enter your email and password."
                    );

                    return;

                }


                if (
                    password.length < 6
                ) {

                    setAuthStatus(
                        "❌ Password must contain at least 6 characters."
                    );

                    return;

                }


                setAuthStatus(
                    "Creating your account..."
                );


                try {

                    const {
                        data,
                        error
                    } =
                        await supabaseClient.auth
                            .signUp({

                                email:
                                    email,

                                password:
                                    password,

                                options: {

                                    emailRedirectTo:
                                        WEBSITE_URL

                                }

                            });


                    if (error) {

                        console.error(
                            "Sign up error:",
                            error
                        );

                        setAuthStatus(
                            "❌ " +
                            error.message
                        );

                        return;

                    }


                    if (
                        data.user &&
                        !data.session
                    ) {

                        setAuthStatus(
                            "✅ Account created. Please check your email and confirm your account before signing in."
                        );

                        return;

                    }


                    setAuthStatus(
                        "✅ Account created successfully."
                    );


                } catch (error) {

                    console.error(
                        error
                    );

                    setAuthStatus(
                        "❌ An unexpected error occurred."
                    );

                }

            }
        );

    }


    /* =========================
       SIGN IN
       ========================= */

    if (
        elementExists(
            signInButton
        )
    ) {

        signInButton.addEventListener(
            "click",
            async function () {

                const email =
                    emailInput.value.trim();

                const password =
                    passwordInput.value;


                if (
                    !email ||
                    !password
                ) {

                    setAuthStatus(
                        "❌ Please enter your email and password."
                    );

                    return;

                }


                setAuthStatus(
                    "Signing in..."
                );


                try {

                    const {
                        data,
                        error
                    } =
                        await supabaseClient.auth
                            .signInWithPassword({

                                email:
                                    email,

                                password:
                                    password

                            });


                    if (error) {

                        console.error(
                            "Sign in error:",
                            error
                        );

                        setAuthStatus(
                            "❌ " +
                            error.message
                        );

                        return;

                    }


                    setAuthStatus(
                        "✅ Login successful."
                    );


                    await checkLogin();


                } catch (error) {

                    console.error(
                        error
                    );

                    setAuthStatus(
                        "❌ Unable to sign in."
                    );

                }

            }
        );

    }


    /* =========================
       LOGOUT
       ========================= */

    if (
        elementExists(
            logoutButton
        )
    ) {

        logoutButton.addEventListener(
            "click",
            async function () {

                try {

                    const {
                        error
                    } =
                        await supabaseClient.auth
                            .signOut();


                    if (error) {

                        console.error(
                            error
                        );

                        return;

                    }


                    students = [];

                    currentSubscriptionPlan =
                        "";

                    reportsGenerated =
                        0;

                    currentUserId =
                        null;


                    /* =========================
                       CLEAR LOCAL APP DATA
                       ========================= */

                    localStorage.removeItem(
                        STUDENT_DATA_STORAGE_KEY
                    );

                    localStorage.removeItem(
                        STUDENT_SUBJECTS_STORAGE_KEY
                    );

                    localStorage.removeItem(
                        REPORT_SETTINGS_STORAGE_KEY
                    );

                    clearGeneratedReports();


                    /* =========================
                       CLEAR INTERFACE
                       ========================= */

                    if (studentSelect) {

                        studentSelect.innerHTML =
                            "-- Select Student --";

                    }

                    if (reportContainer) {

                        reportContainer.innerHTML =
                            "";

                    }

                    if (reportSection) {

                        reportSection.style.display =
                            "none";

                    }


                    showLogin();


                    setAuthStatus(
                        "You have been logged out."
                    );


                } catch (error) {

                    console.error(
                        error
                    );

                }

            }
        );

    }

}


/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

async function forgotPassword() {

    const email =
        prompt(
            "Enter the email address you used to create your account:"
        );


    if (!email) {
        return;
    }


    const cleanEmail =
        email.trim();


    if (!cleanEmail) {

        alert(
            "Please enter your email address."
        );

        return;

    }


    try {

        const {
            error
        } =
            await supabaseClient.auth
                .resetPasswordForEmail(
                    cleanEmail,
                    {

                        redirectTo:
                            WEBSITE_URL

                    }
                );


        if (error) {

            console.error(
                error
            );

            alert(
                "❌ " +
                error.message
            );

            return;

        }


        alert(
            "✅ Password reset email sent."
        );


    } catch (error) {

        console.error(
            error
        );

        alert(
            "❌ Unable to send password reset email."
        );

    }

}


/* =========================================================
   UPDATE PASSWORD
   ========================================================= */

async function updatePassword() {

    const newPasswordElement =
        document.getElementById(
            "newPassword"
        );

    const confirmPasswordElement =
        document.getElementById(
            "confirmNewPassword"
        );


    if (
        !newPasswordElement ||
        !confirmPasswordElement
    ) {

        alert(
            "Password fields could not be found."
        );

        return;

    }


    const newPassword =
        newPasswordElement.value;

    const confirmPassword =
        confirmPasswordElement.value;


    if (!newPassword) {

        alert(
            "Please enter a new password."
        );

        return;

    }


    if (
        newPassword !==
        confirmPassword
    ) {

        alert(
            "❌ The passwords do not match."
        );

        return;

    }


    if (
        newPassword.length < 6
    ) {

        alert(
            "❌ Password must be at least 6 characters."
        );

        return;

    }


    try {

        const {
            error
        } =
            await supabaseClient.auth
                .updateUser({

                    password:
                        newPassword

                });


        if (error) {

            console.error(
                error
            );

            alert(
                "❌ " +
                error.message
            );

            return;

        }


        alert(
            "✅ Password changed successfully."
        );


        const resetSection =
            document.getElementById(
                "resetPasswordSection"
            );


        if (resetSection) {

            resetSection.style.display =
                "none";

        }


        newPasswordElement.value =
            "";

        confirmPasswordElement.value =
            "";


    } catch (error) {

        console.error(
            error
        );

        alert(
            "❌ Unable to change password."
        );

    }

}


/* =========================================================
   AUTH STATUS
   ========================================================= */

function setAuthStatus(message) {

    if (
        elementExists(
            authStatus
        )
    ) {

        authStatus.innerHTML =
            message;

    }

}


/* =========================================================
   CHECK LOGIN
   ========================================================= */

async function checkLogin() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth
                .getSession();


        if (error) {

            console.error(
                error
            );

            showLogin();

            return;

        }


        if (!data.session) {

            currentSubscriptionPlan =
                "";

            reportsGenerated =
                0;

            currentUserId =
                null;

            showLogin();

            return;

        }


        const user =
            data.session.user;


        currentUserId =
            user.id;


        await checkSubscription(
            user
        );


    } catch (error) {

        console.error(
            error
        );

        showLogin();

    }

}


/* =========================================================
   CHECK SUBSCRIPTION
   ========================================================= */

async function checkSubscription(user) {

try {

    const {
        data: subscription,
        error
    } =
        await supabaseClient
            .from("subscriptions")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle();


    /* =================================================
       DATABASE ERROR
    ================================================= */

    if (error) {

        console.error(
            "Subscription database error:",
            error
        );

        currentSubscriptionPlan = "";
        reportsGenerated = 0;

        displaySubscriptionStatus(
            null,
            user
        );

        showSubscription();

        return;

    }


    /* =================================================
       RESET VALUES
    ================================================= */

    currentSubscriptionPlan = "";
    reportsGenerated = 0;


    /* =================================================
       NO SUBSCRIPTION RECORD
    ================================================= */

    if (!subscription) {

        displaySubscriptionStatus(
            null,
            user
        );

        showSubscription();

        return;

    }


    /* =================================================
       READ PLAN
    ================================================= */

    currentSubscriptionPlan =
        String(

            subscription.plan ||

            subscription.subscription_plan ||

            subscription.package ||

            ""

        )
            .trim()
            .toLowerCase();


    /* =================================================
       READ REPORT COUNT
    ================================================= */

    reportsGenerated =
        Number(
            subscription.reports_generated
        ) || 0;


    /* =================================================
       READ STATUS
    ================================================= */

    const subscriptionStatusValue =
        String(
            subscription.status ||
            ""
        )
            .trim()
            .toLowerCase();


    /* =================================================
       CHECK EXPIRATION
    ================================================= */

    let subscriptionIsActive = false;


    if (
        subscription.expires_at
    ) {

        const expiryDate =
            new Date(
                subscription.expires_at
            );


        const now =
            new Date();


        if (
            !isNaN(
                expiryDate.getTime()
            ) &&
            expiryDate > now
        ) {

            subscriptionIsActive = true;

        }

    }


    /* =================================================
       ACCEPT VALID PAID STATUS VALUES
    ================================================= */

    const validPaidStatuses = [

        "paid",
        "active",
        "success",
        "successful",
        "completed"

    ];


    const paymentStatusIsValid =
        validPaidStatuses.includes(
            subscriptionStatusValue
        );


    /* =================================================
       DISPLAY STATUS
    ================================================= */

    displaySubscriptionStatus(
        subscription,
        user
    );


    /* =================================================
       FINAL ACCESS CHECK
    ================================================= */

    if (

        paymentStatusIsValid &&

        subscriptionIsActive &&

        currentSubscriptionPlan &&

        REPORT_LIMITS[
            currentSubscriptionPlan
        ]

    ) {

        console.log(
            "Active subscription:",
            currentSubscriptionPlan
        );

        showApp();

        updateReportStatus();

    } else {

        console.log(
            "Subscription is not active.",
            {
                status:
                    subscriptionStatusValue,

                plan:
                    currentSubscriptionPlan,

                expires_at:
                    subscription.expires_at
            }
        );

        showSubscription();

    }


} catch (error) {

    console.error(
        "Subscription check failed:",
        error
    );

    currentSubscriptionPlan = "";
    reportsGenerated = 0;

    showSubscription();

}

}


/* =========================================================
   AUTH STATE
   ========================================================= */

supabaseClient.auth.onAuthStateChange(
    function () {

        setTimeout(
            function () {

                checkLogin();

            },
            0
        );

    }
);


/* =========================================================
   PASSWORD RECOVERY
   ========================================================= */

supabaseClient.auth.onAuthStateChange(
    function (event) {

        if (
            event ===
            "PASSWORD_RECOVERY"
        ) {

            const resetSection =
                document.getElementById(
                    "resetPasswordSection"
                );


            if (resetSection) {

                resetSection.style.display =
                    "block";

            }

        }

    }
);


/* =========================================================
   DISPLAY SUBSCRIPTION
   ========================================================= */

function displaySubscriptionStatus(
subscription,
user
) {

if (
    !elementExists(
        subscriptionStatus
    )
) {

    return;

}


subscriptionStatus.style.display =
    "block";


/* =================================================
   NO SUBSCRIPTION
================================================= */

if (!subscription) {

    subscriptionStatus.innerHTML = `

        <strong>
            Subscription Status:
        </strong>

        <span style="color:red;">
            UNPAID
        </span>

        <br>

        Account:
        ${escapeHTML(
            user?.email || ""
        )}

        <br><br>

        Please choose a subscription plan
        to access the Student Report Generator.

    `;

    return;

}


/* =================================================
   PLAN
================================================= */

const plan =
    String(

        subscription.plan ||

        subscription.subscription_plan ||

        subscription.package ||

        ""

    )
        .trim()
        .toLowerCase();


/* =================================================
   STATUS
================================================= */

const status =
    String(
        subscription.status ||
        ""
    )
        .trim()
        .toLowerCase();


/* =================================================
   EXPIRY
================================================= */

let expiryDate = null;

let expiryText =
    "Unknown";


if (
    subscription.expires_at
) {

    expiryDate =
        new Date(
            subscription.expires_at
        );


    if (
        !isNaN(
            expiryDate.getTime()
        )
    ) {

        expiryText =
            expiryDate.toLocaleDateString();

    }

}


/* =================================================
   ACTIVE?
================================================= */

const validPaidStatuses = [

    "paid",
    "active",
    "success",
    "successful",
    "completed"

];


const statusIsPaid =
    validPaidStatuses.includes(
        status
    );


const isExpired =
    !expiryDate ||
    isNaN(
        expiryDate.getTime()
    ) ||
    expiryDate <= new Date();


const isActive =
    statusIsPaid &&
    !isExpired;


/* =================================================
   REPORT LIMIT
================================================= */

const limit =
    REPORT_LIMITS[plan] ||
    0;


const generated =
    Number(
        subscription.reports_generated
    ) || 0;


const remaining =
    limit
        ? Math.max(
            limit - generated,
            0
        )
        : 0;


/* =================================================
   ACTIVE SUBSCRIPTION
================================================= */

if (isActive) {

    subscriptionStatus.innerHTML = `

        <strong>
            Subscription Status:
        </strong>

        <span style="color:green;">
            PAID / ACTIVE
        </span>

        <br>

        <strong>
            Plan:
        </strong>

        ${escapeHTML(
            getPlanDisplayNameFromPlan(
                plan
            )
        )}

        <br>

        <strong>
            Account:
        </strong>

        ${escapeHTML(
            user?.email || ""
        )}

        <br>

        <strong>
            Expires:
        </strong>

        ${escapeHTML(
            expiryText
        )}

        ${
            limit
                ? `

                    <br>

                    <strong>
                        Reports Generated:
                    </strong>

                    ${generated}
                    /
                    ${limit}

                    <br>

                    <strong>
                        Reports Remaining:
                    </strong>

                    ${remaining}

                `
                : ""
        }

    `;

    return;

}


/* =================================================
   EXPIRED
================================================= */

if (
    statusIsPaid &&
    isExpired
) {

    subscriptionStatus.innerHTML = `

        <strong>
            Subscription Status:
        </strong>

        <span style="color:red;">
            EXPIRED
        </span>

        <br>

        <strong>
            Plan:
        </strong>

        ${escapeHTML(
            getPlanDisplayNameFromPlan(
                plan
            )
        )}

        <br>

        <strong>
            Expired:
        </strong>

        ${escapeHTML(
            expiryText
        )}

        <br><br>

        Please renew your subscription
        to continue using the system.

    `;

    return;

}


/* =================================================
   UNPAID / INVALID
================================================= */

subscriptionStatus.innerHTML = `

    <strong>
        Subscription Status:
    </strong>

    <span style="color:red;">
        UNPAID
    </span>

    <br>

    Account:
    ${escapeHTML(
        user?.email || ""
    )}

    <br><br>

    Please choose a subscription plan.

`;

}


/* =========================================================
   GET PLAN DISPLAY NAME
   ========================================================= */

function getPlanDisplayNameFromPlan(
    plan
) {

    const cleanPlan =
        String(
            plan || ""
        )
            .trim()
            .toLowerCase();


    if (
        cleanPlan ===
        "basic"
    ) {

        return "BASIC";

    }


    if (
        cleanPlan ===
        "standard"
    ) {

        return "STANDARD";

    }


    if (
        cleanPlan ===
        "premium"
    ) {

        return "PREMIUM";

    }


    return "UNKNOWN";

}


/* =========================================================
   APPLICATION EVENTS
   ========================================================= */

function attachApplicationEvents() {


    if (
        elementExists(
            downloadTemplateButton
        )
    ) {

        downloadTemplateButton.addEventListener(
            "click",
            downloadExcelTemplate
        );

    }


    if (
        elementExists(
            excelFileInput
        )
    ) {

        excelFileInput.addEventListener(
            "change",
            handleExcelUpload
        );

    }


    if (
        elementExists(
            generateReportButton
        )
    ) {

        generateReportButton.addEventListener(
            "click",
            generateSingleReport
        );

    }


    if (
        elementExists(
            generateAllButton
        )
    ) {

        generateAllButton.addEventListener(
            "click",
            generateAllReports
        );

    }


    attachPaystackButtons();

}


/* =========================================================
   SUBJECT MANAGER
   ========================================================= */

function createSubjectManager() {

    if (
        !elementExists(
            appSection
        )
    ) {

        return;

    }


    const existing =
        document.getElementById(
            "subjectManager"
        );


    if (existing) {

        return;

    }


    const manager =
        document.createElement(
            "section"
        );


    manager.id =
        "subjectManager";


    manager.className =
        "card";


    manager.innerHTML = `

        <h2>
            School Subjects
        </h2>

        <p>
            Add or remove subjects before downloading
            the Excel template.
        </p>

        <div id="subjectList"></div>

        <div style="margin-top:10px;">

            <input
                type="text"
                id="newSubjectInput"
                placeholder="Enter subject name"
            >

            <button
                type="button"
                id="addSubjectButton"
            >
                Add Subject
            </button>

        </div>

    `;


    const firstCard =
        appSection.querySelector(
            ".card"
        );


    if (firstCard) {

        firstCard.parentNode.insertBefore(
            manager,
            firstCard
        );

    } else {

        appSection.prepend(
            manager
        );

    }


    renderSubjectList();


    const addButton =
        document.getElementById(
            "addSubjectButton"
        );


    const input =
        document.getElementById(
            "newSubjectInput"
        );


    if (addButton) {

        addButton.addEventListener(
            "click",
            function () {

                const subject =
                    input.value.trim();


                if (!subject) {

                    alert(
                        "Please enter a subject name."
                    );

                    return;

                }


                addSubject(
                    subject
                );


                input.value =
                    "";

            }
        );

    }

}


/* =========================================================
   RENDER SUBJECT LIST
   ========================================================= */

function renderSubjectList() {

    const list =
        document.getElementById(
            "subjectList"
        );


    if (!list) {

        return;

    }


    list.innerHTML =
        "";


    schoolSubjects.forEach(
        function (
            subject,
            index
        ) {

            const item =
                document.createElement(
                    "div"
                );


            item.style.display =
                "flex";

            item.style.alignItems =
                "center";

            item.style.gap =
                "8px";

            item.style.marginBottom =
                "6px";


            item.innerHTML = `

                <input
                    type="text"
                    value="${escapeHTML(subject)}"
                    data-subject-index="${index}"
                    class="subject-name-input"
                    style="flex:1;"
                >

                <button
                    type="button"
                    data-remove-subject="${index}"
                >
                    Remove
                </button>

            `;


            list.appendChild(
                item
            );

        }
    );


    list.querySelectorAll(
        ".subject-name-input"
    )
        .forEach(
            function (input) {

                input.addEventListener(
                    "change",
                    function () {

                        const index =
                            Number(
                                input.dataset
                                    .subjectIndex
                            );


                        const newName =
                            input.value.trim();


                        if (!newName) {

                            alert(
                                "Subject name cannot be empty."
                            );

                            renderSubjectList();

                            return;

                        }


                        const duplicate =
                            schoolSubjects.some(
                                function (
                                    subject,
                                    subjectIndex
                                ) {

                                    return (

                                        subjectIndex !==
                                        index &&

                                        subject.toLowerCase() ===
                                        newName.toLowerCase()

                                    );

                                }
                            );


                        if (duplicate) {

                            alert(
                                "This subject already exists."
                            );

                            renderSubjectList();

                            return;

                        }


                        schoolSubjects[index] =
                            newName;


                        saveAppData();

                    }
                );

            }
        );


    list.querySelectorAll(
        "[data-remove-subject]"
    )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                button.dataset
                                    .removeSubject
                            );


                        schoolSubjects.splice(
                            index,
                            1
                        );


                        renderSubjectList();

                        saveAppData();

                    }
                );

            }
        );

}


/* =========================================================
   ADD SUBJECT
   ========================================================= */

function addSubject(
    subject
) {

    const exists =
        schoolSubjects.some(
            function (existing) {

                return (

                    existing.toLowerCase() ===
                    subject.toLowerCase()

                );

            }
        );


    if (exists) {

        alert(
            "This subject already exists."
        );

        return;

    }


    schoolSubjects.push(
        subject
    );


    renderSubjectList();

    saveAppData();

}


/* =========================================================
   SAFE SUBJECT SHEET NAME
   ========================================================= */

function getSubjectSheetName(
    subject,
    workbook
) {

    let clean =
        String(subject)
            .replace(
                /[:\/?*\[\]]/g,
                ""
            )
            .trim();


    if (!clean) {

        clean =
            "Subject";

    }


    clean =
        clean.substring(
            0,
            31
        );


    let finalName =
        clean;


    let counter =
        2;


    while (
        workbook.SheetNames.some(
            function (name) {

                return (

                    name.toLowerCase() ===
                    finalName.toLowerCase()

                );

            }
        )
    ) {

        const suffix =
            " " +
            counter;


        finalName =
            clean.substring(
                0,
                31 -
                suffix.length
            ) +
            suffix;


        counter++;

    }


    return finalName;

}


/* =========================================================
   DOWNLOAD EXCEL TEMPLATE
   ========================================================= */

function downloadExcelTemplate() {

    try {

        if (
            typeof XLSX ===
            "undefined"
        ) {

            alert(
                "Excel library has not loaded. Please refresh the page."
            );

            return;

        }


        schoolSubjects =
            schoolSubjects
                .map(
                    function (subject) {

                        return String(
                            subject
                        ).trim();

                    }
                )
                .filter(
                    function (subject) {

                        return (
                            subject !== ""
                        );

                    }
                );


        if (
            schoolSubjects.length ===
            0
        ) {

            alert(
                "Please add at least one subject."
            );

            return;

        }


        const workbook =
            XLSX.utils.book_new();


        /* =================================================
           SCORES SHEET
           ================================================= */

        const scoresHeaders = [

            "Admission No",
            "Student Name",
            "Gender",
            "Class",
            "Term",
            "Session",
            "House"

        ];


        schoolSubjects.forEach(
            function (subject) {

                scoresHeaders.push(
                    subject +
                    " 1st CA"
                );

                scoresHeaders.push(
                    subject +
                    " 2nd CA"
                );

                scoresHeaders.push(
                    subject +
                    " Exams"
                );

            }
        );


        scoresHeaders.push(
            "Overall Total"
        );

        scoresHeaders.push(
            "Average"
        );

        scoresHeaders.push(
            "Position"
        );


        const scoresData = [
            scoresHeaders
        ];


        for (
            let i = 1;
            i <= TEMPLATE_STUDENT_ROWS;
            i++
        ) {

            const row = [

                i === 1
                    ? "001"
                    : "",

                i === 1
                    ? "Example Student"
                    : "",

                i === 1
                    ? "Male"
                    : "",

                i === 1
                    ? "SS2"
                    : "",

                i === 1
                    ? "First Term"
                    : "",

                i === 1
                    ? "2025/2026"
                    : "",

                i === 1
                    ? "Example House"
                    : ""

            ];


            schoolSubjects.forEach(
                function () {

                    row.push("");

                    row.push("");

                    row.push("");

                }
            );


            row.push("");

            row.push("");

            row.push("");


            scoresData.push(
                row
            );

        }


        const scoresSheet =
            XLSX.utils.aoa_to_sheet(
                scoresData
            );


        scoresSheet["!cols"] = [

            { wch: 15 },
            { wch: 30 },
            { wch: 12 },
            { wch: 12 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 }

        ];


        schoolSubjects.forEach(
            function () {

                scoresSheet["!cols"].push(

                    { wch: 15 },
                    { wch: 15 },
                    { wch: 15 }

                );

            }
        );


        scoresSheet["!cols"].push(

            { wch: 18 },
            { wch: 15 },
            { wch: 12 }

        );


        scoresSheet["!freeze"] = {

            xSplit: 0,

            ySplit: 1

        };


        XLSX.utils.book_append_sheet(
            workbook,
            scoresSheet,
            "Scores"
        );


        /* =================================================
           SETTINGS SHEET
           ================================================= */

        const settingsData = [

            [
                "SETTING",
                "VALUE"
            ],

            [
                "School Name",
                reportSettings.schoolName
            ],

            [
                "School Address",
                reportSettings.schoolAddress
            ],

            [
                "1st CA Maximum",
                reportSettings.firstCAMaximum
            ],

            [
                "2nd CA Maximum",
                reportSettings.secondCAMaximum
            ],

            [
                "Exams Maximum",
                reportSettings.examsMaximum
            ],

            [
                "Grade A Minimum",
                reportSettings.gradeA
            ],

            [
                "Grade B Minimum",
                reportSettings.gradeB
            ],

            [
                "Grade C Minimum",
                reportSettings.gradeC
            ],

            [
                "Grade D Minimum",
                reportSettings.gradeD
            ],

            [
                "Grade E Minimum",
                reportSettings.gradeE
            ],

            [
                "Grade F Minimum",
                reportSettings.gradeF
            ],

            [
                "Subjects",
                schoolSubjects.join(", ")
            ]

        ];


        const settingsSheet =
            XLSX.utils.aoa_to_sheet(
                settingsData
            );


        settingsSheet["!cols"] = [

            { wch: 25 },
            { wch: 50 }

        ];


        XLSX.utils.book_append_sheet(
            workbook,
            settingsSheet,
            "Settings"
        );


        /* =================================================
           SUBJECT SHEETS
           ================================================= */

        const actualSubjectSheetNames =
            {};


        schoolSubjects.forEach(
            function (subject) {

                const sheetName =
                    getSubjectSheetName(
                        subject,
                        workbook
                    );


                actualSubjectSheetNames[
                    subject
                ] =
                    sheetName;


                const subjectData = [

                    [
                        "Adm No",
                        "Student Name",
                        "1st CA",
                        "2nd CA",
                        "Exams"
                    ]

                ];


                for (
                    let i = 1;
                    i <= TEMPLATE_STUDENT_ROWS;
                    i++
                ) {

                    subjectData.push([

                        i === 1
                            ? "001"
                            : "",

                        i === 1
                            ? "Example Student"
                            : "",

                        "",
                        "",
                        ""

                    ]);

                }


                const subjectSheet =
                    XLSX.utils.aoa_to_sheet(
                        subjectData
                    );


                subjectSheet["!cols"] = [

                    { wch: 15 },
                    { wch: 30 },
                    { wch: 15 },
                    { wch: 15 },
                    { wch: 15 }

                ];


                subjectSheet["!freeze"] = {

                    xSplit: 0,

                    ySplit: 1

                };


                XLSX.utils.book_append_sheet(
                    workbook,
                    subjectSheet,
                    sheetName
                );

            }
        );


        /* =================================================
           BEHAVIORAL TRAITS SHEET
           ================================================= */

        const behaviorHeaders = [

            "Adm No",
            "Student Name"

        ];


        behavioralTraits.forEach(
            function (trait) {

                behaviorHeaders.push(
                    trait
                );

            }
        );


        behaviorHeaders.push(
            "Class Teacher's Comment"
        );

        behaviorHeaders.push(
            "Principal's Comment"
        );


        const behaviorData = [
            behaviorHeaders
        ];


        for (
            let i = 1;
            i <= TEMPLATE_STUDENT_ROWS;
            i++
        ) {

            behaviorData.push([

                i === 1
                    ? "001"
                    : "",

                i === 1
                    ? "Example Student"
                    : "",

                "",
                "",
                "",
                "",
                "",

                "",

                ""

            ]);

        }


        const behaviorSheet =
            XLSX.utils.aoa_to_sheet(
                behaviorData
            );


        behaviorSheet["!cols"] = [

            { wch: 15 },
            { wch: 30 },

            { wch: 15 },
            { wch: 15 },
            { wch: 22 },
            { wch: 15 },
            { wch: 15 },

            { wch: 35 },
            { wch: 35 }

        ];


        behaviorSheet["!freeze"] = {

            xSplit: 0,

            ySplit: 1

        };


        XLSX.utils.book_append_sheet(
            workbook,
            behaviorSheet,
            "Behavioral Traits"
        );


        /* =================================================
           VLOOKUP FORMULAS
           ================================================= */

        schoolSubjects.forEach(
            function (
                subject,
                subjectIndex
            ) {

                const sheetName =
                    actualSubjectSheetNames[
                        subject
                    ];


                const safeSheetName =
                    sheetName.replace(
                        /'/g,
                        "''"
                    );


                const firstCAColumn =
                    8 +
                    (
                        subjectIndex *
                        3
                    );


                const secondCAColumn =
                    firstCAColumn +
                    1;


                const examsColumn =
                    firstCAColumn +
                    2;


                const firstCALetter =
                    XLSX.utils.encode_col(
                        firstCAColumn - 1
                    );


                const secondCALetter =
                    XLSX.utils.encode_col(
                        secondCAColumn - 1
                    );


                const examsLetter =
                    XLSX.utils.encode_col(
                        examsColumn - 1
                    );


                for (
                    let row = 2;
                    row <=
                    TEMPLATE_STUDENT_ROWS + 1;
                    row++
                ) {

                    scoresSheet[
                        firstCALetter +
                        row
                    ] = {

                        t: "n",

                        f:
                            `IF($B${row}="","",IFERROR(VLOOKUP($B${row},'${safeSheetName}'!$B:$E,2,FALSE),""))`

                    };


                    scoresSheet[
                        secondCALetter +
                        row
                    ] = {

                        t: "n",

                        f:
                            `IF($B${row}="","",IFERROR(VLOOKUP($B${row},'${safeSheetName}'!$B:$E,3,FALSE),""))`

                    };


                    scoresSheet[
                        examsLetter +
                        row
                    ] = {

                        t: "n",

                        f:
                            `IF($B${row}="","",IFERROR(VLOOKUP($B${row},'${safeSheetName}'!$B:$E,4,FALSE),""))`

                    };

                }

            }
        );


        /* =================================================
           OVERALL TOTAL / AVERAGE / POSITION
           ================================================= */

        const firstSubjectColumn =
            8;


        const lastSubjectColumn =
            firstSubjectColumn +
            (
                schoolSubjects.length *
                3
            ) -
            1;


        const overallTotalColumn =
            lastSubjectColumn +
            1;


        const averageColumn =
            overallTotalColumn +
            1;


        const positionColumn =
            averageColumn +
            1;


        const firstSubjectLetter =
            XLSX.utils.encode_col(
                firstSubjectColumn - 1
            );


        const lastSubjectLetter =
            XLSX.utils.encode_col(
                lastSubjectColumn - 1
            );


        const overallTotalLetter =
            XLSX.utils.encode_col(
                overallTotalColumn - 1
            );


        const averageLetter =
            XLSX.utils.encode_col(
                averageColumn - 1
            );


        const positionLetter =
            XLSX.utils.encode_col(
                positionColumn - 1
            );


        for (
            let row = 2;
            row <=
            TEMPLATE_STUDENT_ROWS + 1;
            row++
        ) {

            scoresSheet[
                overallTotalLetter +
                row
            ] = {

                t: "n",

                f:
                    `IF($B${row}="","",SUM(${firstSubjectLetter}${row}:${lastSubjectLetter}${row}))`

            };


            scoresSheet[
                averageLetter +
                row
            ] = {

                t: "n",

                f:
                    `IF($B${row}="","",IFERROR(${overallTotalLetter}${row}/${schoolSubjects.length},0))`

            };


            scoresSheet[
                positionLetter +
                row
            ] = {

                t: "n",

                f:
                    `IF($B${row}="","",RANK(${averageLetter}${row},$${averageLetter}$2:$${averageLetter}$${TEMPLATE_STUDENT_ROWS + 1},0))`

            };

        }


        /* =================================================
           WRITE FILE
           ================================================= */

        const excelData =
            XLSX.write(
                workbook,
                {

                    bookType:
                        "xlsx",

                    type:
                        "array"

                }
            );


        const blob =
            new Blob(
                [excelData],
                {

                    type:
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            "Student_Report_Template.xlsx";


        document.body.appendChild(
            link
        );


        link.click();


        setTimeout(
            function () {

                URL.revokeObjectURL(
                    url
                );


                if (
                    link.parentNode
                ) {

                    link.parentNode.removeChild(
                        link
                    );

                }

            },
            5000
        );


        setFileStatus(

            "✅ Template created successfully with " +

            schoolSubjects.length +

            " subject sheet(s), House, 1st CA, 2nd CA, Exams, Overall Total, Average, Position, Behavioral Traits and Comments."

        );


    } catch (error) {

        console.error(
            "Excel template error:",
            error
        );


        alert(

            "❌ Excel template could not be created.\n\n" +
            error.message

        );


        setFileStatus(
            "❌ Excel template generation failed."
        );

    }

}


/* =========================================================
   HANDLE EXCEL UPLOAD
   ========================================================= */

function handleExcelUpload(event) {

    const file =
        event.target.files[0];


    if (!file) {
        return;
    }


    if (
        typeof XLSX ===
        "undefined"
    ) {

        setFileStatus(
            "❌ Excel library has not loaded."
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function (e) {

            try {

                const data =
                    new Uint8Array(
                        e.target.result
                    );


                const workbook =
                    XLSX.read(
                        data,
                        {
                            type: "array"
                        }
                    );


                if (
                    !workbook.Sheets[
                        "Scores"
                    ]
                ) {

                    setFileStatus(
                        "❌ The Excel file does not contain a Scores sheet."
                    );

                    return;

                }


                /* =========================
                   SETTINGS
                   ========================= */

                if (
                    workbook.Sheets[
                        "Settings"
                    ]
                ) {

                    readSettings(
                        workbook.Sheets[
                            "Settings"
                        ]
                    );

                }


                /* =========================
                   SCORES
                   ========================= */

                const worksheet =
                    workbook.Sheets[
                        "Scores"
                    ];


                const rows =
                    XLSX.utils.sheet_to_json(
                        worksheet,
                        {
                            defval: ""
                        }
                    );


                const actualRows =
                    rows.filter(
                        function (student) {

                            return (

                                String(
                                    student[
                                        "Admission No"
                                    ] ||
                                    ""
                                ).trim() !==
                                "" ||

                                String(
                                    student[
                                        "Student Name"
                                    ] ||
                                    ""
                                ).trim() !==
                                ""

                            );

                        }
                    );


                if (
                    actualRows.length ===
                    0
                ) {

                    setFileStatus(
                        "❌ No student records found."
                    );

                    return;

                }


                const invalidStudents =
                    actualRows.filter(
                        function (student) {

                            return !String(
                                student[
                                    "Student Name"
                                ] ||
                                ""
                            ).trim();

                        }
                    );


                if (
                    invalidStudents.length >
                    0
                ) {

                    setFileStatus(
                        "❌ One or more student records have no Student Name."
                    );

                    return;

                }


                /* =========================
                   SUBJECTS
                   ========================= */

                const detectedSubjects =
                    detectSubjectsFromRows(
                        actualRows
                    );


                if (
                    detectedSubjects.length >
                    0
                ) {

                    schoolSubjects =
                        detectedSubjects;

                    renderSubjectList();

                }


                /* =========================
                   BEHAVIOR
                   ========================= */

                const behaviorSheet =
                    workbook.Sheets[
                        "Behavioral Traits"
                    ];


                if (behaviorSheet) {

                    attachBehaviorData(
                        actualRows,
                        behaviorSheet
                    );

                } else {

                    actualRows.forEach(
                        function (student) {

                            student.__behavior =
                                {};

                        }
                    );

                }


                /* =========================
                   STORE STUDENTS
                   ========================= */

                students =
                    actualRows;


                saveAppData();


                /* =========================
                   CLEAR OLD GENERATED
                   REPORTS
                   =========================

                   A newly uploaded Excel file
                   represents a new dataset.

                   Therefore old generated reports
                   must not remain attached to it.
                */

                clearGeneratedReports();


                if (reportContainer) {

                    reportContainer.innerHTML =
                        "";

                }


                /* =========================
                   STATUS
                   ========================= */

                setFileStatus(

                    "✅ Excel file successfully loaded. " +

                    students.length +

                    " student record(s) found. " +

                    schoolSubjects.length +

                    " subject(s) detected."

                );


                loadStudents();


                if (reportSection) {

                    reportSection.style.display =
                        "block";

                }


                updateReportStatus();


            } catch (error) {

                console.error(
                    "Excel upload error:",
                    error
                );


                setFileStatus(
                    "❌ Unable to read this Excel file."
                );

            }

        };


    reader.readAsArrayBuffer(
        file
    );

}


/* =========================================================
   READ SETTINGS
   ========================================================= */

function readSettings(
    settingsSheet
) {

    const rows =
        XLSX.utils.sheet_to_json(
            settingsSheet,
            {
                header: 1,
                defval: ""
            }
        );


    rows.forEach(
        function (row) {

            const setting =
                String(
                    row[0] ||
                    ""
                ).trim();


            const value =
                row[1];


            if (
                setting ===
                "School Name"
            ) {

                reportSettings.schoolName =
                    String(value);

            }


            if (
                setting ===
                "School Address"
            ) {

                reportSettings.schoolAddress =
                    String(value);

            }


            if (
                setting ===
                "1st CA Maximum"
            ) {

                reportSettings.firstCAMaximum =
                    Number(value) ||
                    20;

            }


            if (
                setting ===
                "2nd CA Maximum"
            ) {

                reportSettings.secondCAMaximum =
                    Number(value) ||
                    20;

            }


            if (
                setting ===
                "Exams Maximum"
            ) {

                reportSettings.examsMaximum =
                    Number(value) ||
                    60;

            }


            if (
                setting ===
                "Grade A Minimum"
            ) {

                reportSettings.gradeA =
                    Number(value);

            }


            if (
                setting ===
                "Grade B Minimum"
            ) {

                reportSettings.gradeB =
                    Number(value);

            }


            if (
                setting ===
                "Grade C Minimum"
            ) {

                reportSettings.gradeC =
                    Number(value);

            }


            if (
                setting ===
                "Grade D Minimum"
            ) {

                reportSettings.gradeD =
                    Number(value);

            }


            if (
                setting ===
                "Grade E Minimum"
            ) {

                reportSettings.gradeE =
                    Number(value);

            }


            if (
                setting ===
                "Grade F Minimum"
            ) {

                reportSettings.gradeF =
                    Number(value);

            }


            if (
                setting ===
                "Subjects"
            ) {

                const importedSubjects =
                    String(
                        value || ""
                    )
                        .split(",")
                        .map(
                            function (
                                subject
                            ) {

                                return subject.trim();

                            }
                        )
                        .filter(
                            function (
                                subject
                            ) {

                                return (
                                    subject.length >
                                    0
                                );

                            }
                        );


                if (
                    importedSubjects.length >
                    0
                ) {

                    schoolSubjects =
                        importedSubjects;

                }

            }

        }
    );


    renderSubjectList();

    saveAppData();

}


/* =========================================================
   DETECT SUBJECTS
   ========================================================= */

function detectSubjectsFromRows(
    rows
) {

    if (
        !rows ||
        rows.length ===
        0
    ) {

        return [];

    }


    const firstStudent =
        rows[0];


    const subjectSet =
        new Set();


    Object.keys(
        firstStudent
    )
        .forEach(
            function (key) {

                const match =
                    key.match(
                        /^(.+)\s+(1st CA|2nd CA|Exams)$/i
                    );


                if (match) {

                    subjectSet.add(
                        match[1].trim()
                    );

                }

            }
        );


    return Array.from(
        subjectSet
    );

}


/* =========================================================
   ATTACH BEHAVIOR DATA
   ========================================================= */

function attachBehaviorData(
    scoreRows,
    behaviorSheet
) {

    const behaviorRows =
        XLSX.utils.sheet_to_json(
            behaviorSheet,
            {
                defval: ""
            }
        );


    const behaviorMap =
        new Map();


    behaviorRows.forEach(
        function (row) {

            const name =
                String(
                    row[
                        "Student Name"
                    ] ||
                    ""
                )
                    .trim()
                    .toLowerCase();


            if (name) {

                behaviorMap.set(
                    name,
                    {

                        Attendance:
                            row[
                                "Attendance"
                            ] ||
                            "",

                        Punctuality:
                            row[
                                "Punctuality"
                            ] ||
                            "",

                        "Class Participation":
                            row[
                                "Class Participation"
                            ] ||
                            "",

                        Neatness:
                            row[
                                "Neatness"
                            ] ||
                            "",

                        Honesty:
                            row[
                                "Honesty"
                            ] ||
                            "",

                        "Class Teacher's Comment":
                            row[
                                "Class Teacher's Comment"
                            ] ||
                            "",

                        "Principal's Comment":
                            row[
                                "Principal's Comment"
                            ] ||
                            ""

                    }
                );

            }

        }
    );


    scoreRows.forEach(
        function (student) {

            const name =
                String(
                    student[
                        "Student Name"
                    ] ||
                    ""
                )
                    .trim()
                    .toLowerCase();


            const behavior =
                behaviorMap.get(
                    name
                );


            if (behavior) {

                student.__behavior =
                    behavior;

            } else {

                student.__behavior = {

                    Attendance:
                        "",

                    Punctuality:
                        "",

                    "Class Participation":
                        "",

                    Neatness:
                        "",

                    Honesty:
                        "",

                    "Class Teacher's Comment":
                        "",

                    "Principal's Comment":
                        ""

                };

            }

        }
    );

}


/* =========================================================
   LOAD STUDENTS
   ========================================================= */

function loadStudents() {

    if (
        !elementExists(
            studentSelect
        )
    ) {

        return;

    }


    studentSelect.innerHTML =
        "-- Select Student --";


    students.forEach(
        function (
            student,
            index
        ) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                index;


            option.textContent =

                (
                    student[
                        "Admission No"
                    ] ||
                    ""
                ) +

                " - " +

                (
                    student[
                        "Student Name"
                    ] ||
                    ""
                );


            studentSelect.appendChild(
                option
            );

        }
    );

}


/* =========================================================
   REPORT LIMIT FUNCTIONS
   ========================================================= */

function getReportLimit() {

    const plan =
        String(
            currentSubscriptionPlan ||
            ""
        )
            .trim()
            .toLowerCase();


    return (
        REPORT_LIMITS[plan] ||
        0
    );

}


/* =========================================================
   GET PLAN DISPLAY NAME
   ========================================================= */

function getPlanDisplayName() {

    return getPlanDisplayNameFromPlan(
        currentSubscriptionPlan
    );

}


/* =========================================================
   UPDATE REPORT STATUS
   ========================================================= */

function updateReportStatus() {

    const limit =
        getReportLimit();


    const plan =
        getPlanDisplayName();


    let statusElement =
        document.getElementById(
            "reportGenerationStatus"
        );


    if (!statusElement) {

        statusElement =
            document.createElement(
                "div"
            );


        statusElement.id =
            "reportGenerationStatus";


        statusElement.style.margin =
            "10px 0";


        statusElement.style.padding =
            "10px";


        statusElement.style.borderRadius =
            "6px";


        statusElement.style.fontWeight =
            "bold";


        statusElement.style.background =
            "#f5f5f5";


        if (reportSection) {

            reportSection.prepend(
                statusElement
            );

        }

    }


    if (!limit) {

        statusElement.innerHTML =
            "⚠️ Subscription plan could not be determined.";

        return;

    }


    const remaining =
        Math.max(
            limit -
            reportsGenerated,
            0
        );


    statusElement.innerHTML =

        "📊 Subscription: " +
        plan +

        "<br>" +

        "📄 Reports generated: " +
        reportsGenerated +
        " / " +
        limit +

        "<br>" +

        "📌 Reports remaining: " +
        remaining;


    if (
        reportsGenerated >=
        limit
    ) {

        statusElement.innerHTML +=

            "<br><br>" +

            "⚠️ Report generation limit reached. " +

            "Please upgrade your subscription to generate more reports.";

    }

}


/* =========================================================
   CAN GENERATE REPORTS
   ========================================================= */

function canGenerateReports(
    numberOfReports
) {

    const limit =
        getReportLimit();


    if (!limit) {

        alert(
            "❌ Your subscription plan could not be determined."
        );

        return false;

    }


    const remaining =
        limit -
        reportsGenerated;


    if (
        remaining <=
        0
    ) {

        alert(

            "⚠️ REPORT GENERATION LIMIT REACHED\n\n" +

            "Subscription: " +
            getPlanDisplayName() +
            "\n" +

            "Reports generated: " +
            reportsGenerated +
            " / " +
            limit +
            "\n\n" +

            "Please upgrade your subscription to generate more reports."

        );


        updateReportStatus();


        return false;

    }


    if (
        numberOfReports >
        remaining
    ) {

        alert(

            "⚠️ REPORT LIMIT EXCEEDED\n\n" +

            "Subscription: " +
            getPlanDisplayName() +
            "\n" +

            "Reports generated: " +
            reportsGenerated +
            " / " +
            limit +
            "\n" +

            "Reports remaining: " +
            remaining +
            "\n\n" +

            "You requested " +
            numberOfReports +
            " report(s), but only " +
            remaining +
            " report(s) remain."

        );


        updateReportStatus();


        return false;

    }


    return true;

}


/* =========================================================
   INCREMENT REPORT COUNT SECURELY
   ========================================================= */

async function incrementReportCount(
    amount
) {

    if (!currentUserId) {

        console.error(
            "No authenticated user found."
        );

        return false;

    }


    const reportAmount =
        Number(amount);


    if (

        !Number.isInteger(
            reportAmount
        ) ||

        reportAmount <=
        0

    ) {

        console.error(
            "Invalid report count:",
            amount
        );

        return false;

    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .rpc(
                    "increment_reports_generated",
                    {

                        report_count:
                            reportAmount

                    }
                );


        if (error) {

            console.error(
                "Unable to increment report count:",
                error
            );

            return false;

        }


        reportsGenerated =
            Number(data) ||
            reportsGenerated +
            reportAmount;


        updateReportStatus();


        return true;


    } catch (error) {

        console.error(
            "Report count error:",
            error
        );

        return false;

    }

}


/* =========================================================
   GENERATE SINGLE REPORT
   ========================================================= */

async function generateSingleReport() {

    if (
        !elementExists(
            studentSelect
        )
    ) {

        return;

    }


    const index =
        studentSelect.value;


    if (
        index === ""
    ) {

        alert(
            "Please select a student."
        );

        return;

    }


    const student =
        students[
            Number(index)
        ];


    if (!student) {

        return;

    }


    /* =========================
       CHECK REPORT LIMIT
       ========================= */

    if (
        !canGenerateReports(1)
    ) {

        return;

    }


    const report =
        createReport(
            student
        );


    if (reportContainer) {

        reportContainer.innerHTML =
            report;


        /* =========================
           SAVE GENERATED REPORT
           ========================= */

        saveGeneratedReports();


        reportContainer.scrollIntoView({

            behavior:
                "smooth"

        });

    }


    await incrementReportCount(
        1
    );

}


/* =========================================================
   GENERATE ALL REPORTS
   ========================================================= */

async function generateAllReports() {

    if (
        !students ||
        students.length ===
        0
    ) {

        alert(
            "❌ Please upload an Excel file containing student records first."
        );

        return;

    }


    const limit =
        getReportLimit();


    if (!limit) {

        alert(
            "❌ Your subscription plan could not be determined."
        );

        return;

    }


    const remaining =
        Math.max(
            limit -
            reportsGenerated,
            0
        );


    if (
        remaining <=
        0
    ) {

        alert(

            "⚠️ REPORT GENERATION LIMIT REACHED\n\n" +

            "Subscription: " +
            getPlanDisplayName() +
            "\n" +

            "Reports generated: " +
            reportsGenerated +
            " / " +
            limit +
            "\n\n" +

            "Please upgrade your subscription to generate more reports."

        );


        updateReportStatus();


        return;

    }


    const totalStudents =
        students.length;


    let numberToGenerate =
        totalStudents;


    let stoppedByLimit =
        false;


    if (
        totalStudents >
        remaining
    ) {

        numberToGenerate =
            remaining;

        stoppedByLimit =
            true;

    }


    const confirmation =
        confirm(

            "Generate reports for " +
            numberToGenerate +
            " student(s)?\n\n" +

            "Subscription: " +
            getPlanDisplayName() +
            "\n" +

            "Current reports generated: " +
            reportsGenerated +
            " / " +
            limit +
            "\n" +

            "Reports remaining: " +
            remaining +

            (

                stoppedByLimit

                    ? "\n\n⚠️ Your subscription limit means only " +
                      numberToGenerate +
                      " report(s) can be generated."

                    : ""

            )

        );


    if (!confirmation) {

        return;

    }


    if (
        !canGenerateReports(
            numberToGenerate
        )
    ) {

        return;

    }


    if (reportContainer) {

        reportContainer.innerHTML =
            "";

    }


    let generatedCount =
        0;


    for (
        let i = 0;
        i < numberToGenerate;
        i++
    ) {

        const student =
            students[i];


        if (!student) {

            continue;

        }


        const report =
            createReport(
                student
            );


        if (reportContainer) {

            reportContainer.insertAdjacentHTML(
                "beforeend",
                report
            );

        }


        generatedCount++;


        /* =========================
           UPDATE PROGRESS
           ========================= */

        if (
            generatedCount %
            10 ===
            0
        ) {

            updateTemporaryGenerationMessage(
                generatedCount,
                numberToGenerate
            );


            await new Promise(
                function (resolve) {

                    setTimeout(
                        resolve,
                        0
                    );

                }
            );

        }

    }


    /* =====================================================
       REMOVE TEMPORARY PROGRESS MESSAGE
       BEFORE SAVING REPORTS
       ===================================================== */

    const generationProgress =
        document.getElementById(
            "generationProgress"
        );


    if (generationProgress) {

        generationProgress.remove();

    }


    /* =====================================================
       SAVE ALL GENERATED REPORTS
       ===================================================== */

    if (
        generatedCount >
        0
    ) {

        saveGeneratedReports();


        await incrementReportCount(
            generatedCount
        );

    }


    updateReportStatus();


    if (stoppedByLimit) {

        alert(

            "⚠️ Generation stopped at your subscription limit.\n\n" +

            "Subscription: " +
            getPlanDisplayName() +
            "\n" +

            "Reports generated this operation: " +
            generatedCount +
            "\n" +

            "Total reports generated: " +
            reportsGenerated +
            " / " +
            limit +
            "\n\n" +

            "There were " +
            (
                totalStudents -
                numberToGenerate
            ) +
            " student(s) remaining."

        );


    } else {

        alert(

            "✅ All reports generated successfully.\n\n" +

            "Reports generated: " +
            generatedCount +
            "\n" +

            "Total used: " +
            reportsGenerated +
            " / " +
            limit +
            "\n" +

            "Reports remaining: " +

            Math.max(
                limit -
                reportsGenerated,
                0
            )

        );

    }


    if (reportContainer) {

        reportContainer.scrollIntoView({

            behavior:
                "smooth"

        });

    }

}


/* =========================================================
   TEMPORARY GENERATION MESSAGE
   ========================================================= */

function updateTemporaryGenerationMessage(
    generated,
    total
) {

    if (!reportContainer) {

        return;

    }


    const existing =
        document.getElementById(
            "generationProgress"
        );


    if (!existing) {

        const progress =
            document.createElement(
                "div"
            );


        progress.id =
            "generationProgress";


        progress.style.padding =
            "10px";


        progress.style.marginBottom =
            "10px";


        progress.style.fontWeight =
            "bold";


        progress.innerHTML =

            "⏳ Generating reports: " +

            generated +

            " / " +

            total;


        reportContainer.prepend(
            progress
        );


    } else {

        existing.innerHTML =

            "⏳ Generating reports: " +

            generated +

            " / " +

            total;

    }

}


/* =========================================================
   CREATE REPORT
   ========================================================= */

function createReport(student) {

    const subjects = [];


    let overallTotal =
        0;


    let subjectsToUse =
        schoolSubjects;


    const detectedSubjects =
        detectSubjectsFromRows(
            [student]
        );


    if (
        detectedSubjects.length >
        0
    ) {

        subjectsToUse =
            detectedSubjects;

    }


    /* =====================================================
       SUBJECT RESULTS
       ===================================================== */

    subjectsToUse.forEach(
        function (subjectName) {

            const firstCAKey =
                subjectName +
                " 1st CA";


            const secondCAKey =
                subjectName +
                " 2nd CA";


            const examsKey =
                subjectName +
                " Exams";


            const firstCA =
                Number(
                    student[
                        firstCAKey
                    ]
                ) || 0;


            const secondCA =
                Number(
                    student[
                        secondCAKey
                    ]
                ) || 0;


            const exams =
                Number(
                    student[
                        examsKey
                    ]
                ) || 0;


            const total =
                firstCA +
                secondCA +
                exams;


            const hasSubject =

                Object.prototype
                    .hasOwnProperty.call(
                        student,
                        firstCAKey
                    ) ||

                Object.prototype
                    .hasOwnProperty.call(
                        student,
                        secondCAKey
                    ) ||

                Object.prototype
                    .hasOwnProperty.call(
                        student,
                        examsKey
                    );


            if (hasSubject) {

                subjects.push({

                    name:
                        subjectName,

                    firstCA:
                        firstCA,

                    secondCA:
                        secondCA,

                    exams:
                        exams,

                    total:
                        total

                });


                overallTotal +=
                    total;

            }

        }
    );


    /* =====================================================
       AVERAGE
       ===================================================== */

    const numberOfSubjects =
        subjects.length;


    const average =

        numberOfSubjects > 0

            ? overallTotal /
              numberOfSubjects

            : 0;


    const grade =
        getGrade(
            average
        );


    /* =====================================================
       POSITION FROM UPLOADED TEMPLATE
       ===================================================== */

    const positionValue =
        student[
            "Position"
        ];


    const hasPosition =
        String(
            positionValue ??
            ""
        ).trim() !== "";


    let position =
        null;


    if (hasPosition) {

        const numericPosition =
            Number(
                positionValue
            );


        if (
            !isNaN(
                numericPosition
            )
        ) {

            position =
                numericPosition;

        }

    }


    /* =====================================================
       NUMBER OF STUDENTS IN CLASS
       ===================================================== */

    const classSize =
        students.filter(
            function (student) {

                return String(
                    student[
                        "Student Name"
                    ] ||
                    ""
                ).trim() !== "";

            }
        ).length;


    /* =====================================================
       SUBJECT ROWS
       ===================================================== */

    let subjectRows =
        "";


    subjects.forEach(
        function (
            subject,
            index
        ) {

            subjectRows += `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td class="subject-name">
                        ${escapeHTML(
                            subject.name
                        )}
                    </td>

                    <td>
                        ${formatScore(
                            subject.firstCA
                        )}
                    </td>

                    <td>
                        ${formatScore(
                            subject.secondCA
                        )}
                    </td>

                    <td>
                        ${formatScore(
                            subject.exams
                        )}
                    </td>

                    <td class="total-cell">
                        ${formatScore(
                            subject.total
                        )}
                    </td>

                    <td class="grade-cell">
                        ${getGrade(
                            subject.total
                        )}
                    </td>

                </tr>

            `;

        }
    );


    /* =====================================================
       BEHAVIORAL DATA
       ===================================================== */

    const behavior =
        student.__behavior ||
        {};


    /* =====================================================
       TRAIT HEADERS
       ===================================================== */

    let traitHeaders = `

        <th class="trait-title">
            TRAIT
        </th>

    `;


    behavioralTraits.forEach(
        function (trait) {

            traitHeaders += `

                <th>
                    ${escapeHTML(
                        trait
                    )}
                </th>

            `;

        }
    );


    /* =====================================================
       TRAIT RATINGS
       ===================================================== */

    let traitRatings = `

        <td class="trait-title">
            Rating
        </td>

    `;


    behavioralTraits.forEach(
        function (trait) {

            const rating =

                behavior[trait] !==
                undefined

                    ? behavior[trait]

                    : "";


            traitRatings += `

                <td class="trait-rating">

                    ${escapeHTML(
                        rating
                    )}

                </td>

            `;

        }
    );


    /* =====================================================
       COMMENTS
       ===================================================== */

    const teacherComment =
        behavior[
            "Class Teacher's Comment"
        ] || "";


    const principalComment =
        behavior[
            "Principal's Comment"
        ] || "";


    /* =====================================================
       HOUSE
       ===================================================== */

    const studentHouse =
        student[
            "House"
        ] || "";


    /* =====================================================
       DYNAMIC MARKING SETTINGS
       ===================================================== */

    const firstCAMax =
        Number(
            reportSettings
                .firstCAMaximum
        ) || 20;


    const secondCAMax =
        Number(
            reportSettings
                .secondCAMaximum
        ) || 20;


    const examsMax =
        Number(
            reportSettings
                .examsMaximum
        ) || 60;


    const totalMaximum =
        firstCAMax +
        secondCAMax +
        examsMax;


    /* =====================================================
       REPORT
       ===================================================== */

    return `

        <div class="report">

            <div class="school-header">

                <h1>
                    ${escapeHTML(
                        reportSettings
                            .schoolName
                    )}
                </h1>

                <p>
                    ${escapeHTML(
                        reportSettings
                            .schoolAddress
                    )}
                </p>

                <h2>
                    STUDENT REPORT SHEET
                </h2>

            </div>


            <!-- STUDENT INFORMATION -->

            <div class="student-info">

                <div>

                    <strong>
                        Admission No:
                    </strong>

                    ${escapeHTML(
                        student[
                            "Admission No"
                        ] || ""
                    )}

                </div>


                <div>

                    <strong>
                        Student Name:
                    </strong>

                    ${escapeHTML(
                        student[
                            "Student Name"
                        ] || ""
                    )}

                </div>


                <div>

                    <strong>
                        Gender:
                    </strong>

                    ${escapeHTML(
                        student[
                            "Gender"
                        ] || ""
                    )}

                </div>


                <div>

                    <strong>
                        Class:
                    </strong>

                    ${escapeHTML(
                        student[
                            "Class"
                        ] || ""
                    )}

                </div>


                <div>

                    <strong>
                        House:
                    </strong>

                    ${escapeHTML(
                        studentHouse
                    )}

                </div>


                <div>

                    <strong>
                        Term:
                    </strong>

                    ${escapeHTML(
                        student[
                            "Term"
                        ] || ""
                    )}

                </div>


                <div>

                    <strong>
                        Session:
                    </strong>

                    ${escapeHTML(
                        student[
                            "Session"
                        ] || ""
                    )}

                </div>


                <div>

                    <strong>
                        Class Size:
                    </strong>

                    ${classSize}

                </div>

            </div>


            <!-- SUBJECT RESULTS -->

            <table class="result-table">

                <thead>

                    <tr>

                        <th>
                            No.
                        </th>

                        <th>
                            Subject
                        </th>

                        <th>
                            1st CA<br>
                            (${firstCAMax} mks)
                        </th>

                        <th>
                            2nd CA<br>
                            (${secondCAMax} mks)
                        </th>

                        <th>
                            Exams<br>
                            (${examsMax} mks)
                        </th>

                        <th>
                            Total<br>
                            (${totalMaximum} Mks)
                        </th>

                        <th>
                            Grade
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${subjectRows}

                </tbody>


                <tfoot>

                    <tr>

                        <th colspan="5">
                            OVERALL TOTAL
                        </th>

                        <th colspan="2">
                            ${overallTotal.toFixed(2)}
                        </th>

                    </tr>

                </tfoot>

            </table>


            <!-- SUMMARY -->

            <div class="summary">

                <p>

                    <strong>
                        Overall Total
                    </strong>

                    ${overallTotal.toFixed(2)}

                </p>


                <p>

                    <strong>
                        Average
                    </strong>

                    ${average.toFixed(2)}%

                </p>


                <p>

                    <strong>
                        Class Position
                    </strong>

                    <span class="position-value">

                        ${
                            hasPosition &&
                            position !== null

                                ? formatPosition(
                                    position
                                )

                                : ""
                        }

                    </span>

                </p>


                <p>

                    <strong>
                        Overall Grade
                    </strong>

                    ${grade}

                </p>

            </div>


            <!-- BEHAVIORAL TRAITS -->

            <div class="behavior-section">

                <h3>
                    BEHAVIORAL TRAITS
                </h3>

                <p>
                    Rating: 1 = Lowest, 5 = Highest
                </p>


                <table class="behavior-table">

                    <thead>

                        <tr>

                            ${traitHeaders}

                        </tr>

                    </thead>


                    <tbody>

                        <tr>

                            ${traitRatings}

                        </tr>

                    </tbody>

                </table>

            </div>


            <!-- COMMENTS -->

            <div class="comments">

                <p>

                    <strong>
                        Class Teacher's Comment:
                    </strong>

                </p>


                <div class="comment-box">

                    ${escapeHTML(
                        teacherComment
                    )}

                </div>


                <p>

                    <strong>
                        Principal's Comment:
                    </strong>

                </p>


                <div class="comment-box">

                    ${escapeHTML(
                        principalComment
                    )}

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   GRADING
   ========================================================= */

function getGrade(
    score
) {

    if (
        score >=
        reportSettings.gradeA
    ) {

        return "A";

    }


    if (
        score >=
        reportSettings.gradeB
    ) {

        return "B";

    }


    if (
        score >=
        reportSettings.gradeC
    ) {

        return "C";

    }


    if (
        score >=
        reportSettings.gradeD
    ) {

        return "D";

    }


    if (
        score >=
        reportSettings.gradeE
    ) {

        return "E";

    }


    return "F";

}


/* =========================================================
   CALCULATE POSITION
   Kept for compatibility.
   The report itself reads Position directly
   from the uploaded Excel template.
   ========================================================= */

function calculatePosition(
    currentStudent,
    allStudents
) {

    const currentAverage =
        calculateStudentAverage(
            currentStudent
        );


    let position =
        1;


    allStudents.forEach(
        function (student) {

            const studentAverage =
                calculateStudentAverage(
                    student
                );


            if (
                studentAverage >
                currentAverage
            ) {

                position++;

            }

        }
    );


    return position;

}


/* =========================================================
   CALCULATE AVERAGE
   ========================================================= */

function calculateStudentAverage(
    student
) {

    let total =
        0;


    let subjectCount =
        0;


    schoolSubjects.forEach(
        function (subject) {

            const firstCA =
                Number(
                    student[
                        subject +
                        " 1st CA"
                    ]
                ) || 0;


            const secondCA =
                Number(
                    student[
                        subject +
                        " 2nd CA"
                    ]
                ) || 0;


            const exams =
                Number(
                    student[
                        subject +
                        " Exams"
                    ]
                ) || 0;


            const hasSubject =

                Object.prototype
                    .hasOwnProperty.call(
                        student,
                        subject +
                        " 1st CA"
                    ) ||

                Object.prototype
                    .hasOwnProperty.call(
                        student,
                        subject +
                        " 2nd CA"
                    ) ||

                Object.prototype
                    .hasOwnProperty.call(
                        student,
                        subject +
                        " Exams"
                    );


            if (hasSubject) {

                total +=

                    firstCA +
                    secondCA +
                    exams;


                subjectCount++;

            }

        }
    );


    if (
        subjectCount ===
        0
    ) {

        return 0;

    }


    return (
        total /
        subjectCount
    );

}


/* =========================================================
   FORMAT POSITION
   ========================================================= */

function formatPosition(
    position
) {

    const lastTwo =
        position %
        100;


    if (
        lastTwo >= 11 &&
        lastTwo <= 13
    ) {

        return (
            position +
            "th"
        );

    }


    switch (
        position %
        10
    ) {

        case 1:

            return (
                position +
                "st"
            );


        case 2:

            return (
                position +
                "nd"
            );


        case 3:

            return (
                position +
                "rd"
            );


        default:

            return (
                position +
                "th"
            );

    }

}


/* =========================================================
   FORMAT SCORE
   ========================================================= */

function formatScore(
    score
) {

    const number =
        Number(score);


    if (
        Number.isInteger(
            number
        )
    ) {

        return String(
            number
        );

    }


    return number.toFixed(2);

}


/* =========================================================
   PAYSTACK BUTTONS
   ========================================================= */

function attachPaystackButtons() {

    const buttons =
        document.querySelectorAll(
            ".subscribe-button"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    startPaystackPayment(
                        button
                    );

                }
            );

        }
    );

}


/* =========================================================
   START PAYSTACK
   ========================================================= */

async function startPaystackPayment(
    button
) {

    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth
                .getSession();


        if (
            error ||
            !data.session
        ) {

            alert(
                "Please create an account or sign in before subscribing."
            );

            return;

        }


        const user =
            data.session.user;


        const plan =
            button.dataset.plan;


        const price =
            Number(
                button.dataset.price
            );


        const duration =
            button.dataset.duration ||
            "";


        if (
            !plan ||
            !price
        ) {

            alert(
                "Invalid subscription plan."
            );

            return;

        }


        if (
            typeof PaystackPop ===
            "undefined"
        ) {

            alert(
                "Paystack has not loaded."
            );

            return;

        }


        const handler =
            PaystackPop.setup({

                key:
                    PAYSTACK_PUBLIC_KEY,

                email:
                    user.email,

                amount:
                    price * 100,

                currency:
                    "NGN",


                /* =================================================
                   PAYSTACK METADATA
                   ================================================= */

                metadata: {

                    user_id:
                        user.id,

                    plan:
                        plan,

                    duration:
                        duration,

                    website_id:
                        WEBSITE_ID

                },


                /* =================================================
                   PAYMENT CALLBACK
                   ================================================= */

                callback:
                    async function (
                        response
                    ) {

                        alert(
                            "Payment received. Verifying payment..."
                        );


                        await verifyPaystackPayment(
                            response.reference,
                            plan
                        );

                    },


                /* =================================================
                   CLOSE
                   ================================================= */

                onClose:
                    function () {

                        console.log(
                            "Paystack checkout closed."
                        );

                    }

            });


        handler.openIframe();


    } catch (error) {

        console.error(
            "Paystack start error:",
            error
        );


        alert(
            "Unable to start payment."
        );

    }

}


/* =========================================================
   VERIFY PAYSTACK PAYMENT
   ========================================================= */

async function verifyPaystackPayment(
    reference,
    plan
) {

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .functions
                .invoke(
                    "verify-paystack-payment-websites",
                    {

                        body: {

                            reference:
                                reference,

                            plan:
                                plan,

                            website_id:
                                WEBSITE_ID

                        }

                    }
                );


        if (error) {

            console.error(
                "Payment verification error:",
                error
            );


            alert(
                "Payment verification failed. Please contact support."
            );


            return;

        }


        if (
            data &&
            data.success
        ) {

            alert(

                "✅ Payment successful!\n\nYour " +

                plan.toUpperCase() +

                " subscription for ReportSheet is now active."

            );


            await checkLogin();


        } else {

            console.error(
                "Payment verification response:",
                data
            );


            alert(

                data &&
                data.error

                    ? data.error

                    : "Payment could not be verified."

            );

        }


    } catch (error) {

        console.error(
            "Payment verification exception:",
            error
        );


        alert(
            "An error occurred while verifying payment."
        );

    }

}


/* =========================================================
   FILE STATUS
   ========================================================= */

function setFileStatus(
    message
) {

    if (
        elementExists(
            fileStatus
        )
    ) {

        fileStatus.innerHTML =
            message;

    }

}





/* =========================================================
   HTML SECURITY
   ========================================================= */

function escapeHTML(
    value
) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   END OF SCRIPT
   ========================================================= */
