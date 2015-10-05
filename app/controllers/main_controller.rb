class MainController < ApplicationController
	
	# rails 보안 어쩌구
	def verified_request?
		true
	end

	def index
	end

	def signup

		username = params[:user_name]
		password = params[:user_password]
		
		if username.length < 5 or username.length > 20
			render :json => { "error_code" => -1 }
		elsif password.length < 8 or password.length > 20
			render :json => { "error_code" => -2 }
		elsif not (User.find_by name: username).nil?
			render :json => { "error_code" => -3 }
		else
			@user = User.new
			@user.name = username
			@user.password = password
			@user.count = 1
			@user.save
			
			render :json => { "user_name" => @user[:name], "login_count" => @user[:count] }
		end

	end


	def login
		
		username = params[:user_name]
		password = params[:user_password]

		# take를 해주어야 한다!!
		@user = User.where(name: username, password: password).take
	
		if @user.nil?
			render :json => { "error_code" => -4 }
		else
			@user.count = @user.count + 1
			@user.save
		render :json => { "user_name" => @user[:name], "login_count" => @user[:count] }
		end

	end

	def clearData
		User.delete_all
	end
end
