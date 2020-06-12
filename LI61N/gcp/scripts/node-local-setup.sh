sudo yum -y update
sudo yum -y install java-1.8.0-openjdk
sudo useradd spring
sudo mkdir /var/spring
sudo cp gcp-0.0.1-SNAPSHOT.jar /var/spring
sudo chown spring:spring /var/spring
sudo cp spring.service /etc/systemd/system
sudo systemctl enable spring
sudo systemctl start spring
sudo firewall-cmd --add-port=80/tcp --permanent
sudo firewall-cmd --add-forward-port=port=80:proto=tcp:toport=8080 --permanent
sudo firewall-cmd --reload
