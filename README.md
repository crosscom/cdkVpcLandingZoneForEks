# This is to create a LandingZone for EKS (VPC and networking resources)!

You can create a VPC with public subnets, private subnets, route tables (associated to each subnet) and IGW, VGW, and NAT-GWs.
After creating this, you have to create an EKS cluster inside of the VPC. 

## HOWTO

 * `npm install`   install CDK packages
 * `cdk bootstrap`
 * `cdk diff`        compare deployed stack with current state
 * `cdk deploy`      deploy this stack to your default AWS account/region

