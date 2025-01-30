using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReadMindMe.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class activitiesUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Communities_CommunityId",
                table: "Activities");

            migrationBuilder.AlterColumn<int>(
                name: "CommunityId",
                table: "Activities",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Communities_CommunityId",
                table: "Activities",
                column: "CommunityId",
                principalTable: "Communities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Communities_CommunityId",
                table: "Activities");

            migrationBuilder.AlterColumn<int>(
                name: "CommunityId",
                table: "Activities",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Communities_CommunityId",
                table: "Activities",
                column: "CommunityId",
                principalTable: "Communities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
