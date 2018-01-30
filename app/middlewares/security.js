/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const Utils = require('./../services/utils');
const permissions = require('./../../config/permissions');

module.exports = function (requiredPermissions = [])
{
    return function (req, res, next)
    {
        let isPermitted = false;
        let validPermissions = [];

        //permissions handle
        req.user.permissions.forEach(permission => {
            if (requiredPermissions.indexOf(permission) != -1 && validPermissions.indexOf(permission) == -1)
                validPermissions.push(permission);
        });

        //role permissions handle
        req.user.roles.forEach(role => {
            const configRole = permissions.roles.find(configRole => configRole.role == role);
            const rolePermissions = configRole ? configRole.permissions : [];

            rolePermissions.forEach(permission => {
                if (requiredPermissions.indexOf(permission) != -1 && validPermissions.indexOf(permission) == -1)
                    validPermissions.push(permission);
            });
        });

        if(validPermissions.length >= requiredPermissions.length)
            isPermitted = true;

        if (!isPermitted && !res.headersSent)
            return res.status(403).json(Utils.parseStringError("Permission Denied", "permission"));

        next();
    }
}

    
        

    
