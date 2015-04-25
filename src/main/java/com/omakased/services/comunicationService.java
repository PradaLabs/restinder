package com.omakased.services;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;




@Path("/comunication")
public class comunicationService {
	

	@GET
    @Path("/sendEmail")
	@Consumes("text/xml")
    public String sendEmail(@PathParam("email") String email){
    	DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    	System.out.println(email);
		Entity newUser = new Entity("userEmail");
		if(email != null && !email.isEmpty()){
			newUser.setProperty("email", email);
			datastore.put(newUser);
		}
		else{
			return "false";
		}
        return "true";
    }
}
