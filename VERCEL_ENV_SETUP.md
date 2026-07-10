# Vercel Environment Variables Setup

## ✅ Quick Setup Guide

لإضافة متغيرات البيئة المطلوبة على Vercel:

### الخطوات:

1. **زيارة لوحة التحكم:**
   - اذهب إلى https://vercel.com/dashboard

2. **اختر المشروع:**
   - اختر `partnex-enterprise-elevated`

3. **الذهاب إلى الإعدادات:**
   - اضغط على **Settings**
   - من الجانب الأيسر، اختر **Environment Variables**

4. **أضف المتغيرات التالية:**

| Variable Name | Value | Environment |
|---|---|---|
| `VITE_SANITY_PROJECT_ID` | `tyse5kwx` | Production, Preview, Development |
| `VITE_SANITY_DATASET` | `production` | Production, Preview, Development |
| `VITE_SANITY_API_VERSION` | `2026-07-01` | Production, Preview, Development |
| `VITE_SANITY_USE_CDN` | `true` | Production, Preview, Development |

5. **حفظ وإعادة نشر:**
   - اضغط "Save"
   - اضغط على **Deployments** tab
   - اختر أحدث deployment
   - اضغط **Redeploy**

## ✨ النتيجة:

بعد الإضافة والـ Redeploy:
- الموقع سيحصل على بيانات Sanity من Production
- جميع التعديلات من Sanity Studio ستظهر على الموقع تلقائياً

---

**التاريخ:** 2026-07-10  
**الحالة:** جاهز للتفعيل ✅
