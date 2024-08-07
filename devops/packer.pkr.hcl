packer {
  required_plugins {
    amazon = {
      version = ">= 1.0.0"
      source = "github.com/hashicorp/amazon"
    }
  }
}



source "amazon-ebs" "east-builder" {
  region       = "us-east-1"
  source_ami   = "ami-079db87dc4c10ac91"
  instance_type = "t2.xlarge"
  ssh_username = "ec2-user"
  ami_name      = "Angular${formatdate("YYMMDDHHMMss", timestamp())}"
  vpc_id      = "vpc-02bb5a1658e5dd7b4"
  subnet_id = "subnet-0234aec3b321af077"
}

build {
  sources = [
    "source.amazon-ebs.east-builder",
  ]
  
  provisioner "shell" {
    inline = [
      "sudo yum update -y",
      "sudo yum install -y nginx",
      "curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -",
      "sudo yum install -y nodejs",
      "sudo npm install -g @angular/cli",
      "sudo yum install -y git",
      "sudo mkdir /opt/app",
      "sudo chmod -R 777 /opt/app",
      "cd /opt/app",
      "git clone https://github.com/stelligent/foundry-angular-example.git .",
      "npm install",
      "ng build",
      "sudo rm -rf /usr/share/nginx/html/*",
      "sudo cp -r /opt/app/dist/foundry-angular-example/* /usr/share/nginx/html/",
      "sudo cp /opt/app/nginx/nginx.conf /etc/nginx/nginx.conf",
      "sudo mkdir /etc/nginx/servers",
      "sudo cp /opt/app/nginx/sites-available/aws /etc/nginx/servers/angular.conf",
      "sudo systemctl enable nginx",
      "sudo systemctl start nginx"
    ]
  }
}
