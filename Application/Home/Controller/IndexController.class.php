<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    // 声明模型变量
	private $_User;
	private $_Pic;
    private $_PicComment;
 	private $_NModel;     //空模型，用于多表操作
 	private $_time = 604800;

 	// 初始化
	public function _initialize(){
		$this->_User = M('user');
    	$this->_Pic=M('pic');
    	$this->_PicComment=M('piccomment');
    	$this->_NModel = M();
	}
    public function check(){
       $data=$this->_Pic->select();
      var_dump($data);
    }

    public function index(){
        if(session('uid')){
            $this->show();
        }
        else
        {
           $this->redirect('/Home/Index/login');
        }

    }
    public function checkLogin(){
    	    $map["username"]=I("post.username");
            $map["password"]=I("post.password");
            //  $map["username"]="s1p21";
            // $map["password"]="123";
            $data=$this->_User->where($map)->find();
        if ($data!=0)
        {
             $this->setSession($data['id'],$data['username']);
             $this->ajaxReturn("0",'json');   
            
        }
        else{
             $this->ajaxReturn("1",'json');
        }
        
    }
     public function register(){
        // $registerForm=I('post.registerForm');
           $registerForm['username']=I('post.username');
           $registerForm['email']=I('post.email');
           $registerForm['password']=md5(I('post.password'));
           if (I('post.password')==I('post.retype-password')){
                $this->_User->create($registerForm);
                $result=$this->_User->add();
                if ($result) {
                    setSession($result,$registerForm['username']);
                }
                else{

                }
           };
          
            echo I('post.username');


    }
    //设置session；
     public function setSession($uid,$name){
        session('uid',$uid,array('expire'=>$this->_time,));
        session('name',$name,array('expire'=>$this->_time,));
    }
    public  function uploadimg()
    {
        // if (session('uid')) {
            $map['authorId']=session('uid');
            $map['authorName']=session('name');
            $map['commentNumber']=0;
            $map['time']=time();    
            $map["pic1"]=gzcompress(I('post.img1'));
            $map["pic2"]=gzcompress(I('post.img2'));
            $this->_Pic->create($map);
            $result=$this->_Pic->add();
            // $s = base64_decode(str_replace('data:image/png;base64,', '', $map["pic1"]));
            // file_put_contents("G:/wat.jpg", $s);
            // $s=gzcompress($map['pic1']);
            // $s=gzcompress($map['pic1']);
            // $s=gzdeflate($map['pic1']);
            $this->ajaxReturn($result,'json');
     
    }
}