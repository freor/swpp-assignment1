$(document).ready(function(){

$("#username").on("input",function() {

	var len = $(this).val().length;
	if(len < 5 || len >20){ 
		$("#error_msg_name").html("The user name should be 5~20 characters long. Please try again.");
	}else{
		$("#error_msg_name").html('');
	}

});

$("#password").on("input",function() {
	var l = $(this).val().length;
	if(l <8 || l > 20){
		$("#error_msg_pass").html("The password should be 8~20 characters long. Please try again.");
	}else{
		$("#error_msg_pass").html('');
	}
});
		

$("#check_pass").change( function() {

	if($(this).is(":checked")){
		$("#password").attr({type: "text"});
	}else{
		$("#password").attr({type: "password"});
	}

});


$("#btn_logout").click(function() {
	
	$("#session_init").show();
	$("#session_logout").hide();
	$("#username").val('');
	$("#password").val('');
	$("#message_box").html("Please enter your credentials below");

});

$("#btn_login").click(function() {
	var userInfo = {
		user_name: $("#username").val(),
		user_password: $("#password").val()
	}

	$.ajax({
	method: "POST",
	url: "/login",
	data: userInfo,
	success: function(data) {
		
		if(data.error_code != null){
			if(data.error_code == -4)
				$("#message_box").html("Invalid username and password combination. Please try again. ");}	
		else{
			$("#session_init").hide();
			$("#session_logout").show();
			$("#wel_username").html(data.user_name);
			$("#wel_count").html(data.login_count);
		}
	
	 },
	error: function(e) { alert(e.responseText); }
	});
});


$("#btn_signup").click(function(){

	var userInfo = {
		user_name: $("#username").val(),
		user_password: $("#password").val()
	}

	$.ajax({
	method: "POST",
	url: "/signup",
	data: userInfo,
	success: function(data){
	
		if(data.error_code != null){
			var error = data.error_code;
			if(error == -1){
				$("#message_box").html("The user name should be 5~20 characters long. Please try again.");}
			else if(error == -2){
				$("#message_box").html("The password should be 8~20 characters long. Please try again.");}
			else if(error == -3){
				$("#message_box").html("This user name already exists. Please try again.");}
		}else{
			$("#session_init").hide();
			$("#session_logout").show();
			$("#wel_username").html(data.user_name);
			$("#wel_count").html(data.login_count);
		}

	},
	error: function(e){ alert(e.responseText); }
	});

});
		

});
