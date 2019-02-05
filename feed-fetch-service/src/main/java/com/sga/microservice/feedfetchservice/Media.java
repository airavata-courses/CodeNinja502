package com.sga.microservice.feedfetchservice;

public class Media {
	
	
	private String comments;
	private String aoi;
	private String userID;
	private String typeOfMedia;
	private int mediaID;
	private String URL;
	private int likes;
	
	public Media() {}

	public Media(String comments, String aoi, String userID, String typeOfMedia, int mediaID, String uRL,
			int likes) {
		super();
		this.comments = comments;
		this.aoi = aoi;
		this.userID = userID;
		this.typeOfMedia = typeOfMedia;
		this.mediaID = mediaID;
		URL = uRL;
		this.likes = likes;
	}

	
	
	
}
