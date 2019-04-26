sudo kubectl delete -f ui_deployment_blue.yaml
sudo kubectl delete -f ui_service_blue.yaml
sudo kubectl apply -f ui_deployment_blue.yaml
sudo kubectl apply -f ui_service_blue.yaml
