using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SignalRChat.Data;

namespace SignalRChat.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private static readonly SigningCredentials SigningCreds = new SigningCredentials(Startup.SecurityKey, SecurityAlgorithms.HmacSha256);
        private readonly JwtSecurityTokenHandler _tokenHandler = new JwtSecurityTokenHandler();

        public AccountController()
        {
        }

        [HttpPost]
        public IActionResult Token(ApplicationUser user)
        {
            // 驗證使用帳號密碼的程式
            
            // 核發 JWT Token 的範例程式
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };
            var token = new JwtSecurityToken(
                "SignalRAuthenticationSample",
                "SignalRAuthenticationSample",
                claims,
                expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: SigningCreds);
            return Ok(new
            {
                token = _tokenHandler.WriteToken(token)
            });
        }
    }
}
