import { createApp } from 'vue'
import App from './App.vue'
import './style/index.scss'
import './style/tailwind.css'
import {createPinia} from "pinia";
import {
    CAvatar, CImage, CButton, CCard, CCardBody, CCardFooter,
    CCardGroup, CCardHeader, CCardImage,
    CCardText, CCardTitle, CCol, CAlert,
    CContainer, CForm, CFormCheck, CFormInput,
    CFormLabel, CFormRange, CFormText, CFormTextarea,
    CHeader, CHeaderNav, CInputGroup, CFormSelect,
    CNav, CNavGroup, CNavItem, CNavLink,
    CRow, CTabContent, CTabPane, CWidgetStatsB,
    CBadge, CFormSwitch, CTable, CTableHead, CTableHeaderCell, CTableBody, CTableDataCell, CTableRow, CPlaceholder,
} from "@coreui/vue";
import {
    cibTiktok, cilX, cibInstagram, cibFacebookF, cilEnvelopeOpen,
    cilChatBubble, cilCopy, cilArrowBottom, cilCheckCircle,
    cilThumbUp, cilThumbDown,
    cilArrowRight, cilArrowTop, cilExcerpt, cilBasket,
    cilBell, cilCalculator, cilCalendar, cilCloudDownload, cilApplications,
    cilHistory, cilTrash, cilBan, cilSettings,
    cilAccountLogout, cilArrowCircleLeft, cilCheckAlt, cilSend,
    cilHamburgerMenu, cilBarChart, cilPlus
} from '@coreui/icons'
import {i18n} from "@/i18n";
import VueGtag from "vue-gtag-next";
import {GOOGLE_ANALYTICS_CODE} from "@/constants/variables.ts";

const icons = {
    cibTiktok, cilX, cibInstagram, cibFacebookF,
    cilEnvelopeOpen, cilChatBubble, cilCheckCircle, cilCopy,
    cilThumbUp, cilThumbDown,
    cilPlus, cilApplications, cilArrowBottom, cilArrowCircleLeft,
    cilArrowRight, cilSend, cilArrowTop, cilBan,
    cilBasket, cilBell, cilTrash, cilCalculator, cilCloudDownload,
    cilCalendar, cilBarChart, cilHistory, cilSettings,
    cilAccountLogout, cilCheckAlt, cilExcerpt, cilHamburgerMenu,
}

const app = createApp(App)

const pinia = createPinia()

app.use(VueGtag, {
    useDebugger: true,
    property: {
        id: GOOGLE_ANALYTICS_CODE,
        params: {
            send_page_view: false,
        }
    }
})

app.use(pinia)
app.use(i18n);

app.provide('icons', icons);

app.component('CImage', CImage)
app.component('CPlaceholder', CPlaceholder)
app.component('CTableHead', CTableHead)
app.component('CTableRow', CTableRow)
app.component('CBadge', CBadge)
app.component('CTableHeaderCell', CTableHeaderCell)
app.component('CTableBody', CTableBody)
app.component('CTableDataCell', CTableDataCell)
app.component('CTable', CTable)
app.component('CFormSwitch', CFormSwitch)
app.component('CWidgetStatsB', CWidgetStatsB)
app.component('CAvatar', CAvatar)
app.component('CHeader', CHeader)
app.component('CRow', CRow)
app.component('CCol', CCol)
app.component('CContainer', CContainer)
app.component('CCard', CCard)
app.component('CButton', CButton)
app.component('CCardText', CCardText)
app.component('CCardTitle', CCardTitle)
app.component('CCardBody', CCardBody)
app.component('CCardImage', CCardImage)
app.component('CCardHeader', CCardHeader)
app.component('CCardFooter', CCardFooter)
app.component('CCardGroup', CCardGroup)
app.component('CFormTextarea', CFormTextarea)
app.component('CForm', CForm)
app.component('CFormInput', CFormInput)
app.component('CFormCheck', CFormCheck)
app.component('CFormLabel', CFormLabel)
app.component('CFormText', CFormText)
app.component('CFormSelect', CFormSelect)
app.component('CInputGroup', CInputGroup)
app.component('CHeaderNav', CHeaderNav)
app.component('CNavItem', CNavItem)
app.component('CNav', CNav)
app.component('CNavGroup', CNavGroup)
app.component('CNavLink', CNavLink)
app.component('CTabContent', CTabContent)
app.component('CTabPane', CTabPane)
app.component('CFormRange', CFormRange)
app.component('CAlert', CAlert)

app.mount('#app')