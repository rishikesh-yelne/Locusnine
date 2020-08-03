using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Locusnine.Models;

namespace Locusnine.Controllers
{
    public class UsersController : Controller
    {
        private LocusnineDBContext db = new LocusnineDBContext();

        public ActionResult Home()
        {
            return RedirectToAction("Index", "Users");
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllUsers()
        {
            return Json(db.tblUsers.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUser(int id)
        {
            tblUser user = db.tblUsers.Find(id);
            if(user == null)
            {
                return Json("", JsonRequestBehavior.AllowGet);
            }
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddUser([Bind(Include = "name,email,roleType,mobileNumber,status")] tblUser tblUser)
        {
            string errorMsg = "";
            if (ModelState.IsValid)
            {
                try
                {
                    tblUser.status = new Random().Next(0, 3);
                    db.tblUsers.Add(tblUser);
                    db.SaveChanges();
                    return Json(new { resultCode = 0, message = "Success" });
                }
                catch (Exception ex)
                {
                    errorMsg = ex.Message;
                }
            }

            return Json(new { resultCode = 1, message = "An Error Occurred. " + errorMsg });
        }

        [HttpPatch]
        public JsonResult EditUser([Bind(Include = "id,name,email,roleType,mobileNumber,status")] tblUser tblUser)
        {
            string errorMsg = "";
            if (ModelState.IsValid)
            {
                try
                {
                    db.Entry(tblUser).State = EntityState.Modified;
                    db.SaveChanges();
                    return Json(new { resultCode = 0, message = "Success" });
                }
                catch(Exception ex)
                {
                    errorMsg = ex.Message;
                }                
            }
            return Json(new { resultCode = 1, message = "An Error Occurred. " + errorMsg });
        }

        [HttpDelete]
        public JsonResult DeleteUser(int id)
        {
            string errorMsg = "";
            tblUser tblUser = db.tblUsers.Find(id);
            if(tblUser != null)
            {
                try
                {
                    db.tblUsers.Remove(tblUser);
                    db.SaveChanges();
                    return Json(new { resultCode = 0, message = "Success" });
                }
                catch(Exception ex)
                {
                    errorMsg = ex.Message;
                }
            }
            return Json(new { resultCode = 1, message = "An Error Occurred. " + errorMsg });
        }
        
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
